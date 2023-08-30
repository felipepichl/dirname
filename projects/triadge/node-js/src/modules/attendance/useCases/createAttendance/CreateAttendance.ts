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
class CreateMeetingAttendance implements IUseCase<IRequest, void> {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('MeetingsRepository')
    private meetingsRepository: IMeetingRepository,
    @inject('AttendanceRepository')
    private attendancesRepository: IAttendancesRepository,
  ) {}

  async execute({ userIds, meetingId }: IRequest): Promise<void> {
    const users = await this.usersRepository.findByIds(userIds)

    if (users.length !== userIds.length) {
      const foundUserIds = users.map((user) => user.id.toString())
      const notFoundUserIds = userIds.filter((id) => !foundUserIds.includes(id))

      throw new AppError(
        `Users with IDs ${notFoundUserIds.join(', ')} not found`,
        404,
      )
    }

    const meeting = await this.meetingsRepository.findById(meetingId)

    if (!meeting) {
      throw new AppError('Meeting not found', 404)
    }

    const existingAttendances =
      await this.attendancesRepository.findByUserIdsAndMeetingId(
        userIds,
        meetingId,
      )
    if (existingAttendances && existingAttendances.length > 0) {
      const allExistingUserIds = existingAttendances.flatMap(
        (attendance) => attendance.userIds,
      )

      const overlappingUserIds = userIds.filter((userId) =>
        allExistingUserIds.includes(userId),
      )

      if (overlappingUserIds.length > 0) {
        throw new AppError(
          `MeetingAttendance for user IDs ${overlappingUserIds.join(
            ', ',
          )} and meeting ID ${meetingId} already exist`,
          409,
        )
      }
    }

    const attendances = Attendance.createAttendance({
      userIds,
      meetingId,
    })

    await this.attendancesRepository.create(attendances)
  }
}

export { CreateMeetingAttendance }
