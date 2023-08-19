import { MeetingAttendance } from '@modules/meeting/domain/MeetingAttendance'

import { IMeetingsAttendancesRepository } from '../IMeetingsAttendancesRepository'

class MeetingsAttendancesRepositoryInMemory
  implements IMeetingsAttendancesRepository
{
  private meetingsAttendances: MeetingAttendance[] = []

  async create(meetingAttendance: MeetingAttendance): Promise<void> {
    this.meetingsAttendances.push(meetingAttendance)
  }

  async findAllByUserId(userId: string): Promise<MeetingAttendance[]> {
    return this.meetingsAttendances.filter((object) =>
      object.userIds.includes(userId),
    )
  }

  async findAllByAttendanceId(
    attendanceId: string,
  ): Promise<MeetingAttendance[]> {
    return this.meetingsAttendances.filter(
      (object) => object.attendanceId === attendanceId,
    )
  }

  async findByUserIdAndAttendanceId(
    userId: string,
    attendanceId: string,
  ): Promise<MeetingAttendance> {
    return this.meetingsAttendances.find(
      (object) =>
        object.userIds.includes(userId) && object.attendanceId === attendanceId,
    )
  }

  async findByUserIdsAndAttendanceId(
    userIds: string[],
    attendanceId: string,
  ): Promise<MeetingAttendance[]> {
    return this.meetingsAttendances.filter(
      (object) =>
        object.userIds.some((uid) => userIds.includes(uid)) &&
        object.attendanceId === attendanceId,
    )
  }

  async findByUserIdAndDate(
    userId: string,
    date: Date,
  ): Promise<MeetingAttendance> {
    return this.meetingsAttendances.find(
      (object) =>
        object.userIds.includes(userId) && object.attendances.date === date,
    )
  }

  async listByDate(date: Date): Promise<MeetingAttendance[]> {
    return this.meetingsAttendances.filter(
      (object) => object.attendances.date === date,
    )
  }

  async listInDateRange(
    startDate: Date,
    endDate: Date,
  ): Promise<MeetingAttendance[]> {
    return this.meetingsAttendances.filter(
      (object) =>
        object.attendances.date >= startDate &&
        object.attendances.date <= endDate,
    )
  }
}

export { MeetingsAttendancesRepositoryInMemory }
