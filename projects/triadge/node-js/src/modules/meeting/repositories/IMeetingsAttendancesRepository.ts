import { MeetingAttendance } from '../domain/MeetingAttendance'

interface IMeetingsAttendancesRepository {
  create(meetingAttendance: MeetingAttendance): Promise<void>
  findAllByUserId(userId: string): Promise<MeetingAttendance[]>
  findAllByAttendanceId(attendanceId: string): Promise<MeetingAttendance[]>
  findByUserIdAndAttendanceId(
    userId: string,
    attendanceId: string,
  ): Promise<MeetingAttendance | undefined>
  findByUserIdsAndAttendanceId(
    userIds: string[],
    attendanceId: string,
  ): Promise<MeetingAttendance[]>
  findByUserIdAndDate(
    userId: string,
    date: Date,
  ): Promise<MeetingAttendance | undefined>
  listByDate(date: Date): Promise<MeetingAttendance[]>
  listInDateRange(startDate: Date, endDate: Date): Promise<MeetingAttendance[]>
}

export { IMeetingsAttendancesRepository }
