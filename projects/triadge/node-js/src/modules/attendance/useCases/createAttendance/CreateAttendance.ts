import { inject, injectable } from 'tsyringe'

import { IUseCase } from '@shared/core/domain/IUseCase'
import { AppError } from '@shared/error/AppError'

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { IMeetingRepository } from '@modules/meeting/repositories/IMeetingRepository'
import { IAttendancesRepository } from '@modules/attendance/repositories/IAttendancesRepository'

import { Attendance } from '@modules/attendance/domain/Attendance'

interface IRequest {
  userIds: string[]
  meetingId: string
}

@injectable()
class CreateAttendance implements IUseCase<IRequest, void> {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('MeetingsRepository')
    private meetingsRepository: IMeetingRepository,
    @inject('AttendanceRepository')
    private attendancesRepository: IAttendancesRepository,
  ) {}

  async execute({ userIds, meetingId }: IRequest): Promise<void> {
    await Promise.all([
      this.validateUsers(userIds),
      this.validateMeeting(meetingId),
      this.validateAttendanceOverlap(userIds, meetingId),
    ])

    const attendances = Attendance.createAttendance({
      userIds,
      meetingId,
    })

    await this.attendancesRepository.create(attendances)
  }

  private async validateUsers(userIds: string[]): Promise<void> {
    const users = await this.usersRepository.findByIds(userIds)

    const notFoundUserIds = userIds.filter(
      (id) => !users.some((user) => user.id.toString() === id),
    )

    if (notFoundUserIds.length) {
      throw new AppError(
        `Users with IDs ${notFoundUserIds.join(', ')} not found`,
        404,
      )
    }
  }

  private async validateMeeting(meetingId: string): Promise<void> {
    const meeting = await this.meetingsRepository.findById(meetingId)
    if (!meeting) {
      throw new AppError('Meeting not found', 404)
    }
  }

  private async validateAttendanceOverlap(
    userIds: string[],
    meetingId: string,
  ): Promise<void> {
    const existingAttendances =
      await this.attendancesRepository.findByUserIdsAndMeetingId(
        userIds,
        meetingId,
      )
    const allExistingUserIds = existingAttendances.flatMap(
      (attendance) => attendance.userIds,
    )
    const overlappingUserIds = userIds.filter((userId) =>
      allExistingUserIds.includes(userId),
    )

    if (overlappingUserIds.length) {
      throw new AppError(
        `MeetingAttendance for user IDs ${overlappingUserIds.join(
          ', ',
        )} and meeting ID ${meetingId} already exists`,
        409,
      )
    }
  }
}

export { CreateAttendance }
