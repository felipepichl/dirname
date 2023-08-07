import { UserAttendance } from '@modules/usersAttendances/domain/UserAttendance';
import { IUserAttendanceRepository } from '@modules/usersAttendances/repositories/IUserAttendanceRepository';

class UserAttendanceRepository implements IUserAttendanceRepository {
  create(userAttendance: UserAttendance): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findAllByUserId(user_id: string): Promise<UserAttendance[]> {
    throw new Error('Method not implemented.');
  }
  findAllByAttendanceId(attendance_id: string): Promise<UserAttendance[]> {
    throw new Error('Method not implemented.');
  }
  findByUserIdAndAttendanceId(
    user_id: string,
    attendance_id: string,
  ): Promise<UserAttendance> {
    throw new Error('Method not implemented.');
  }
  findByUserIdAndDate(user_id: string, date: Date): Promise<UserAttendance> {
    throw new Error('Method not implemented.');
  }
  listByDate(date: Date): Promise<UserAttendance[]> {
    throw new Error('Method not implemented.');
  }
  listInDateRange(startDate: Date, endDate: Date): Promise<UserAttendance[]> {
    throw new Error('Method not implemented.');
  }
}

export { UserAttendanceRepository };
