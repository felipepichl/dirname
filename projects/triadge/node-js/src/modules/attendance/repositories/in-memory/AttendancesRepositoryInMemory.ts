import { Attendance } from '@modules/attendance/domain/Attendance'

import { IAttendancesRepository } from '../IAttendancesRepository'

class AttendancesRepositoryInMemory implements IAttendancesRepository {
  private attendances: Attendance[] = []

  async create(attendance: Attendance): Promise<void> {
    this.attendances.push(attendance)
  }

  async findById(id: string): Promise<Attendance> {
    return this.attendances.find(
      (attendance) => attendance.id.toString() === id,
    )
  }

  async findAll(): Promise<Attendance[]> {
    return this.attendances
  }

  async findByUserId(userId: string): Promise<Attendance[]> {
    return this.attendances.filter((attendance) =>
      attendance.userIds.includes(userId),
    )
  }

  async findByMeetingId(meetingId: string): Promise<Attendance[]> {
    return this.attendances.filter(
      (attendance) => attendance.meetingId === meetingId,
    )
  }

  async findAttendance(userId: string, meetingId: string): Promise<Attendance> {
    return this.attendances.find(
      (attendance) =>
        attendance.userIds.includes(userId) &&
        attendance.meetingId === meetingId,
    )
  }

  // async create(meetingAttendance: MeetingAttendance): Promise<void> {
  //   this.meetingsAttendances.push(meetingAttendance)
  // }

  // async findAllByUserId(userId: string): Promise<MeetingAttendance[]> {
  //   return this.meetingsAttendances.filter((object) =>
  //     object.userIds.includes(userId),
  //   )
  // }

  // async findAllByAttendanceId(
  //   attendanceId: string,
  // ): Promise<MeetingAttendance[]> {
  //   return this.meetingsAttendances.filter(
  //     (object) => object.attendanceId === attendanceId,
  //   )
  // }

  // async findByUserIdAndAttendanceId(
  //   userId: string,
  //   attendanceId: string,
  // ): Promise<MeetingAttendance> {
  //   return this.meetingsAttendances.find(
  //     (object) =>
  //       object.userIds.includes(userId) && object.attendanceId === attendanceId,
  //   )
  // }

  // async findByUserIdsAndAttendanceId(
  //   userIds: string[],
  //   attendanceId: string,
  // ): Promise<MeetingAttendance[]> {
  //   return this.meetingsAttendances.filter(
  //     (object) =>
  //       object.userIds.some((uid) => userIds.includes(uid)) &&
  //       object.attendanceId === attendanceId,
  //   )
  // }

  // async findByUserIdAndDate(
  //   userId: string,
  //   date: Date,
  // ): Promise<MeetingAttendance> {
  //   return this.meetingsAttendances.find(
  //     (object) =>
  //       object.userIds.includes(userId) && object.attendances.date === date,
  //   )
  // }

  // async listByDate(date: Date): Promise<MeetingAttendance[]> {
  //   return this.meetingsAttendances.filter(
  //     (object) => object.attendances.date === date,
  //   )
  // }

  // async listInDateRange(
  //   startDate: Date,
  //   endDate: Date,
  // ): Promise<MeetingAttendance[]> {
  //   return this.meetingsAttendances.filter(
  //     (object) =>
  //       object.attendances.date >= startDate &&
  //       object.attendances.date <= endDate,
  //   )
  // }
}

export { AttendancesRepositoryInMemory }
