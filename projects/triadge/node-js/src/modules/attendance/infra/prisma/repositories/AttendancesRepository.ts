import { Attendance } from '@modules/attendance/domain/Attendance'
import { IAttendancesRepository } from '@modules/attendance/repositories/IAttendancesRepository'

import { PrismaSingleton } from '@shared/infra/prisma'

import { AttendanceMapper } from '../mappers/AttendanceMapper'

class AttendancesRepository implements IAttendancesRepository {
  async create({ userIds, meetingId }: Attendance): Promise<void> {
    const prismaInstance = PrismaSingleton.getInstance()
    const promises = userIds.map((userId) =>
      prismaInstance.attendance.create({
        data: {
          userId,
          meetingId,
        },
      }),
    )
    await Promise.all(promises)
  }

  async findById(id: string): Promise<Attendance> {
    const result = await PrismaSingleton.getInstance().attendance.findFirst({
      where: { id },
    })

    return AttendanceMapper.getMapper().toDomain(result)
  }

  async findAll(): Promise<Attendance[]> {
    const result = await PrismaSingleton.getInstance().attendance.findMany()

    return AttendanceMapper.getMapper().toDomainArray(result)
  }

  async findByUserId(userId: string): Promise<Attendance[]> {
    const result = await PrismaSingleton.getInstance().attendance.findMany({
      where: { userId },
      include: { meeting: true },
    })

    return AttendanceMapper.getMapper().toDomainArray(result)
  }

  async findByMeetingId(meetingId: string): Promise<Attendance[]> {
    const result = await PrismaSingleton.getInstance().attendance.findMany({
      where: { meetingId },
      include: { user: true },
    })

    return AttendanceMapper.getMapper().toDomainArray(result)
  }

  async findByUserIdAndMeetingId(
    userId: string,
    meetingId: string,
  ): Promise<Attendance> {
    const result = await PrismaSingleton.getInstance().attendance.findFirst({
      where: { userId, meetingId },
    })

    return AttendanceMapper.getMapper().toDomain(result)
  }

  async findAttendance(userId: string, meetingId: string): Promise<Attendance> {
    const result = await PrismaSingleton.getInstance().attendance.findFirst({
      where: { userId, meetingId },
    })

    return AttendanceMapper.getMapper().toDomain(result)
  }
}

export { AttendancesRepository }
