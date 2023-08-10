import { UserAttendance } from '../domain/UserAttendance';

interface IUserAttendanceRepository {
  create(userAttendance: UserAttendance): Promise<void>;
  findAllByUserId(user_id: string): Promise<UserAttendance[]>;
  findAllByAttendanceId(attendance_id: string): Promise<UserAttendance[]>;
  findByUserIdAndAttendanceId(
    user_id: string,
    attendance_id: string,
  ): Promise<UserAttendance | undefined>;
  findByUserIdsAndAttendanceId(
    user_ids: string[],
    attendance_id: string,
  ): Promise<UserAttendance[]>;
  findByUserIdAndDate(
    user_id: string,
    date: Date,
  ): Promise<UserAttendance | undefined>;
  listByDate(date: Date): Promise<UserAttendance[]>;
  listInDateRange(startDate: Date, endDate: Date): Promise<UserAttendance[]>;
}

export { IUserAttendanceRepository };
