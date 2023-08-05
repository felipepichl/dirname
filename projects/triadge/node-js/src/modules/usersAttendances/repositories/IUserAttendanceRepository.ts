import { User } from '@modules/accounts/domain/User';
import { Attendance } from '@modules/attendance/domain/Attendance';

import { UserAttendance } from '../domain/UserAttendance';

interface IUserAttendanceRepository {
  create(userAttendance: UserAttendance): Promise<void>;
  findByUserId(user_id: string): Promise<User>;
  findByAttendanceId(attendance_id: string): Promise<Attendance>;
  findByUserIdAndAttendanceId(
    user_id: string,
    attendance_id: string,
  ): Promise<UserAttendance>;
  findByUserIdAndDate(user_id: string, date: Date): Promise<UserAttendance>;
  listByDate(date: Date): Promise<UserAttendance[]>;
  listInDateRange(startDate: Date, endDate: Date): Promise<UserAttendance[]>;
}

export { IUserAttendanceRepository };
