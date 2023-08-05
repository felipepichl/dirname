import { UserAttendance } from '../domain/UserAttendance';

interface IUserAttendanceRepository {
  create(userAttendance: UserAttendance): Promise<void>;
  findByUserId(user_id: string): Promise<UserAttendance[]>;
  findByAttendanceId(attendance_id: string): Promise<UserAttendance[]>;
  findByUserIdAndAttendanceId(
    user_id: string,
    attendance_id: string,
  ): Promise<UserAttendance>;
  findByUserIdAndDate(user_id: string, date: Date): Promise<UserAttendance>;
  listByDate(date: Date): Promise<UserAttendance[]>;
  listInDateRange(startDate: Date, endDate: Date): Promise<UserAttendance[]>;
}

export { IUserAttendanceRepository };
