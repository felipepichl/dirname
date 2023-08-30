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

  async findByUserIdAndMeetingId(
    userId: string,
    meetingId: string,
  ): Promise<Attendance> {
    return this.attendances.find(
      (attendance) =>
        attendance.userIds.includes(userId) &&
        attendance.meetingId === meetingId,
    )
  }

  async findByUserIdsAndMeetingId(
    userIds: string[],
    meetingId: string,
  ): Promise<Attendance[]> {
    return this.attendances.filter(
      (attendance) =>
        userIds.every((userId) => attendance.userIds.includes(userId)) &&
        attendance.meetingId === meetingId,
    )
  }

  async findAttendance(userId: string, meetingId: string): Promise<Attendance> {
    return this.attendances.find(
      (attendance) =>
        attendance.userIds.includes(userId) &&
        attendance.meetingId === meetingId,
    )
  }
}

export { AttendancesRepositoryInMemory }
