import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { IAttendanceRepository } from '@modules/attendance/repositories/IAttendanceRepository'
import { MeetingAttendance } from '@modules/meeting/domain/MeetingAttendance'
import { IMeetingsAttendancesRepository } from '@modules/meeting/repositories/IMeetingsAttendancesRepository'
import { inject, injectable } from 'tsyringe'

import { IUseCase } from '@shared/core/domain/IUseCase'
import { AppError } from '@shared/error/AppError'

interface IRequest {
  userIds: string[]
  attendanceId: string
}

@injectable()
class CreateMeetingAttendance implements IUseCase<IRequest, void> {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('AttendanceRepository')
    private attendancesRepository: IAttendanceRepository,
    @inject('MeetingsAttendancesRepository')
    private meetingsAttendances: IMeetingsAttendancesRepository,
  ) {}

  async execute({ userIds, attendanceId }: IRequest): Promise<void> {
    const users = await this.usersRepository.findByIds(userIds)

    if (users.length !== userIds.length) {
      const foundUserIds = users.map((user) => user.id.toString())
      const notFoundUserIds = userIds.filter((id) => !foundUserIds.includes(id))

      throw new AppError(
        `Users with IDs ${notFoundUserIds.join(', ')} not found`,
        404,
      )
    }

    const attendance = await this.attendancesRepository.findById(attendanceId)

    if (!attendance) {
      throw new AppError('Attendance not found', 404)
    }

    // const existingUserAttendance =
    //   await this.userAttendance.findByUserIdAndAttendanceId(
    //     user_ids,
    //     attendance_id,
    //   );

    // if (existingUserAttendance) {
    //   throw new AppError('UserAttendance already exists', 409);
    // }

    const promises = userIds.map(async (userId) => {
      const existingMeetingAttendance =
        await this.meetingsAttendances.findByUserIdAndAttendanceId(
          userId,
          attendanceId,
        )

      if (existingMeetingAttendance) {
        throw new AppError(
          `MeetingAttendance for user ID ${userId} and attendance ID ${attendanceId} already exists`,
          409,
        )
      }
    })

    await Promise.all(promises)

    const meetingAttendance = MeetingAttendance.createMeetingAttendance({
      userIds,
      attendanceId: attendance.id.toString(),
    })

    await this.meetingsAttendances.create(meetingAttendance)
  }
}

export { CreateMeetingAttendance }
