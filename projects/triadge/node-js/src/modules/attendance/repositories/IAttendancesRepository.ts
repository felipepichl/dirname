import { Attendance } from '../domain/Attendance'

interface IAttendancesRepository {
  create(attendance: Attendance): Promise<void>
  findById(id: string): Promise<Attendance>
  findAll(): Promise<Attendance[]>
  findByUserId(userId: string): Promise<Attendance[]>
  findByMeetingId(meetingId: string): Promise<Attendance[]>
  findByUserIdAndMeetingId(
    userId: string,
    meetingId: string,
  ): Promise<Attendance>
  findAttendance(userId: string, meetingId: string): Promise<Attendance>
}

export { IAttendancesRepository }
