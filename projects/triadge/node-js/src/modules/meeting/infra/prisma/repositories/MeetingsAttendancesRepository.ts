import { MeetingAttendance } from '@modules/meeting/domain/MeetingAttendance'
import { IMeetingsAttendancesRepository } from '@modules/meeting/repositories/IMeetingsAttendancesRepository'

import { PrismaSingleton } from '@shared/infra/prisma'

import { MeetingAttendanceMapper } from '../mappers/MeetingAttendanceMapper'

class MeetingsAttendancesRepository implements IMeetingsAttendancesRepository {
  async create({ user_ids, attendance_id }: MeetingAttendance): Promise<void> {
    const prismaInstance = PrismaSingleton.getInstance()

    const promises = user_ids.map((userId) =>
      prismaInstance.userAttendance.create({
        data: {
          userId,
          attendanceId: attendance_id,
          present: true,
        },
      }),
    )

    await Promise.all(promises)
  }

  async findAllByUserId(user_id: string): Promise<MeetingAttendance[]> {
    const result = await PrismaSingleton.getInstance().userAttendance.findMany({
      where: { userId: user_id },
      include: { user: true, attendance: true },
    })

    return MeetingAttendanceMapper.getMapper().toDomainArray(result)
  }

  async findAllByAttendanceId(
    attendance_id: string,
  ): Promise<MeetingAttendance[]> {
    const result = await PrismaSingleton.getInstance().userAttendance.findMany({
      where: { attendanceId: attendance_id },
      include: { user: true, attendance: true },
    })

    return MeetingAttendanceMapper.getMapper().toDomainArray(result)
  }

  async findByUserIdAndAttendanceId(
    user_id: string,
    attendance_id: string,
  ): Promise<MeetingAttendance> {
    const result = await PrismaSingleton.getInstance().userAttendance.findFirst(
      {
        where: {
          userId: user_id,
          attendanceId: attendance_id,
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
    user_ids: string[],
    attendance_id: string,
  ): Promise<MeetingAttendance[]> {
    const result = await PrismaSingleton.getInstance().userAttendance.findMany({
      where: {
        AND: [
          {
            attendanceId: attendance_id,
          },
          {
            userId: {
              in: user_ids,
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
    user_id: string,
    date: Date,
  ): Promise<MeetingAttendance> {
    const result = await PrismaSingleton.getInstance().userAttendance.findMany({
      where: {
        userId: user_id,
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
