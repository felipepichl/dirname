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

  async findAttendance(userId: string, meetingId: string): Promise<Attendance> {
    const result = await PrismaSingleton.getInstance().attendance.findFirst({
      where: { userId, meetingId },
    })

    return AttendanceMapper.getMapper().toDomain(result)
  }

  // async create({ userIds, attendanceId }: MeetingAttendance): Promise<void> {
  //   const prismaInstance = PrismaSingleton.getInstance()
  //   const promises = userIds.map((userId) =>
  //     prismaInstance.userAttendance.create({
  //       data: {
  //         userId,
  //         attendanceId,
  //         present: true,
  //       },
  //     }),
  //   )
  //   await Promise.all(promises)
  // }
  // async findAllByUserId(userId: string): Promise<MeetingAttendance[]> {
  //   const result = await PrismaSingleton.getInstance().userAttendance.findMany({
  //     where: { userId },
  //     include: { user: true, attendance: true },
  //   })
  //   return MeetingAttendanceMapper.getMapper().toDomainArray(result)
  // }
  // async findAllByAttendanceId(
  //   attendanceId: string,
  // ): Promise<MeetingAttendance[]> {
  //   const result = await PrismaSingleton.getInstance().userAttendance.findMany({
  //     where: { attendanceId },
  //     include: { user: true, attendance: true },
  //   })
  //   return MeetingAttendanceMapper.getMapper().toDomainArray(result)
  // }
  // async findByUserIdAndAttendanceId(
  //   userId: string,
  //   attendanceId: string,
  // ): Promise<MeetingAttendance> {
  //   const result = await PrismaSingleton.getInstance().userAttendance.findFirst(
  //     {
  //       where: {
  //         userId,
  //         attendanceId,
  //       },
  //       include: {
  //         user: true,
  //         attendance: true,
  //       },
  //     },
  //   )
  //   if (!result) {
  //     return null
  //   }
  //   return MeetingAttendanceMapper.getMapper().toDomain(result)
  // }
  // async findByUserIdsAndAttendanceId(
  //   userIds: string[],
  //   attendanceId: string,
  // ): Promise<MeetingAttendance[]> {
  //   const result = await PrismaSingleton.getInstance().userAttendance.findMany({
  //     where: {
  //       AND: [
  //         {
  //           attendanceId,
  //         },
  //         {
  //           userId: {
  //             in: userIds,
  //           },
  //         },
  //       ],
  //     },
  //     include: {
  //       user: true,
  //       attendance: true,
  //     },
  //   })
  //   return MeetingAttendanceMapper.getMapper().toDomainArray(result)
  // }
  // async findByUserIdAndDate(
  //   userId: string,
  //   date: Date,
  // ): Promise<MeetingAttendance> {
  //   const result = await PrismaSingleton.getInstance().userAttendance.findMany({
  //     where: {
  //       userId,
  //     },
  //     include: { attendance: true },
  //   })
  //   const filteredResults = result.find(
  //     (userAttendance) => userAttendance.attendance.date === date,
  //   )
  //   return MeetingAttendanceMapper.getMapper().toDomain(filteredResults)
  // }
  // async listByDate(date: Date): Promise<MeetingAttendance[]> {
  //   const result = await PrismaSingleton.getInstance().userAttendance.findMany({
  //     include: {
  //       user: true,
  //       attendance: true,
  //     },
  //     where: {
  //       attendance: { date },
  //     },
  //   })
  //   console.log('=> Repository', result)
  //   return MeetingAttendanceMapper.getMapper().toDomainArray(result)
  // }
  // async listInDateRange(
  //   startDate: Date,
  //   endDate: Date,
  // ): Promise<MeetingAttendance[]> {
  //   const result = await PrismaSingleton.getInstance().userAttendance.findMany({
  //     include: {
  //       user: true,
  //       attendance: true,
  //     },
  //   })
  //   const filteredResults = result.filter(
  //     (userAttendance) =>
  //       userAttendance.attendance.date >= startDate &&
  //       userAttendance.attendance.date <= endDate,
  //   )
  //   return MeetingAttendanceMapper.getMapper().toDomainArray(filteredResults)
  // }
}

export { AttendancesRepository }
