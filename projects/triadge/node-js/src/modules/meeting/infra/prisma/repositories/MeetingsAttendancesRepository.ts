import { MeetingAttendance } from '@modules/meeting/domain/MeetingAttendance'
import { IMeetingsAttendancesRepository } from '@modules/meeting/repositories/IMeetingsAttendancesRepository'

import { PrismaSingleton } from '@shared/infra/prisma'

import { MeetingAttendanceMapper } from '../mappers/MeetingAttendanceMapper'

class MeetingsAttendancesRepository implements IMeetingsAttendancesRepository {
  async create({ userIds, attendanceId }: MeetingAttendance): Promise<void> {
    const prismaInstance = PrismaSingleton.getInstance()

    const promises = userIds.map((userId) =>
      prismaInstance.userAttendance.create({
        data: {
          userId,
          attendanceId,
          present: true,
        },
      }),
    )

    await Promise.all(promises)
  }

  async findAllByUserId(userId: string): Promise<MeetingAttendance[]> {
    const result = await PrismaSingleton.getInstance().userAttendance.findMany({
      where: { userId },
      include: { user: true, attendance: true },
    })

    return MeetingAttendanceMapper.getMapper().toDomainArray(result)
  }

  async findAllByAttendanceId(
    attendanceId: string,
  ): Promise<MeetingAttendance[]> {
    const result = await PrismaSingleton.getInstance().userAttendance.findMany({
      where: { attendanceId },
      include: { user: true, attendance: true },
    })

    return MeetingAttendanceMapper.getMapper().toDomainArray(result)
  }

  async findByUserIdAndAttendanceId(
    userId: string,
    attendanceId: string,
  ): Promise<MeetingAttendance> {
    const result = await PrismaSingleton.getInstance().userAttendance.findFirst(
      {
        where: {
          userId,
          attendanceId,
        },
        include: {
          user: true,
          attendance: true,
        },
      },
    )

    return MeetingAttendanceMapper.getMapper().toDomain(result)
  }

  async findByUserIdsAndAttendanceId(
    userIds: string[],
    attendanceId: string,
  ): Promise<MeetingAttendance[]> {
    const result = await PrismaSingleton.getInstance().userAttendance.findMany({
      where: {
        AND: [
          {
            attendanceId,
          },
          {
            userId: {
              in: userIds,
            },
          },
        ],
      },
      include: {
        user: true,
        attendance: true,
      },
    })

    return MeetingAttendanceMapper.getMapper().toDomainArray(result)
  }

  async findByUserIdAndDate(
    userId: string,
    date: Date,
  ): Promise<MeetingAttendance> {
    const result = await PrismaSingleton.getInstance().userAttendance.findMany({
      where: {
        userId,
      },
      include: { attendance: true },
    })

    const filteredResults = result.find(
      (userAttendance) => userAttendance.attendance.date === date,
    )

    return MeetingAttendanceMapper.getMapper().toDomain(filteredResults)
  }

  async listByDate(date: Date): Promise<MeetingAttendance[]> {
    const result = await PrismaSingleton.getInstance().userAttendance.findMany({
      include: {
        user: true,
        attendance: true,
      },
    })

    const filteredResults = result.filter(
      (userAttendance) => userAttendance.attendance.date === date,
    )

    return MeetingAttendanceMapper.getMapper().toDomainArray(filteredResults)
  }

  async listInDateRange(
    startDate: Date,
    endDate: Date,
  ): Promise<MeetingAttendance[]> {
    const result = await PrismaSingleton.getInstance().userAttendance.findMany({
      include: {
        user: true,
        attendance: true,
      },
    })

    const filteredResults = result.filter(
      (userAttendance) =>
        userAttendance.attendance.date >= startDate &&
        userAttendance.attendance.date <= endDate,
    )

    return MeetingAttendanceMapper.getMapper().toDomainArray(filteredResults)
  }
}

export { MeetingsAttendancesRepository }
