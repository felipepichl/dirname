import { MeetingAttendance } from '../domain/MeetingAttendance';

interface IMeetingsAttendancesRepository {
  create(meetingAttendance: MeetingAttendance): Promise<void>;
  findAllByUserId(user_id: string): Promise<MeetingAttendance[]>;
  findAllByAttendanceId(attendance_id: string): Promise<MeetingAttendance[]>;
  findByUserIdAndAttendanceId(
    user_id: string,
    attendance_id: string,
  ): Promise<MeetingAttendance | undefined>;
  findByUserIdsAndAttendanceId(
    user_ids: string[],
    attendance_id: string,
  ): Promise<MeetingAttendance[]>;
  findByUserIdAndDate(
    user_id: string,
    date: Date,
  ): Promise<MeetingAttendance | undefined>;
  listByDate(date: Date): Promise<MeetingAttendance[]>;
  listInDateRange(startDate: Date, endDate: Date): Promise<MeetingAttendance[]>;
}

export { IMeetingsAttendancesRepository };
