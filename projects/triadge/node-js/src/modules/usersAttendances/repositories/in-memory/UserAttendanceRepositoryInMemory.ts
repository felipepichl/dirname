import { UserAttendance } from '@modules/usersAttendances/domain/UserAttendance';

import { IUserAttendanceRepository } from '../IUserAttendanceRepository';

class UserAttendanceRepositoryInMemory implements IUserAttendanceRepository {
  private usersAttendances: UserAttendance[] = [];

  async create(userAttendance: UserAttendance): Promise<void> {
    this.usersAttendances.push(userAttendance);
  }
  async findByUserId(user_id: string): Promise<UserAttendance[]> {
    return this.usersAttendances.filter(
      userAttendance => userAttendance.user.id.toString() === user_id,
    );
  }
  async findByAttendanceId(attendance_id: string): Promise<UserAttendance[]> {
    return this.usersAttendances.filter(
      userAttendance =>
        userAttendance.attendances.id.toString() === attendance_id,
    );
  }
  async findByUserIdAndAttendanceId(
    user_id: string,
    attendance_id: string,
  ): Promise<UserAttendance> {
    return this.usersAttendances.find(
      userAttendance =>
        userAttendance.user.id.toString() === user_id &&
        userAttendance.attendances.id.toString() === attendance_id,
    );
  }
  async findByUserIdAndDate(
    user_id: string,
    date: Date,
  ): Promise<UserAttendance> {
    return this.usersAttendances.find(
      userAttendance =>
        userAttendance.user.id.toString() === user_id &&
        userAttendance.attendances.date === date,
    );
  }
  async listByDate(date: Date): Promise<UserAttendance[]> {
    return this.usersAttendances.filter(
      userAttendance => userAttendance.attendances.date === date,
    );
  }
  listInDateRange(startDate: Date, endDate: Date): Promise<UserAttendance[]> {
    throw new Error('Method not implemented.');
  }
}

export { UserAttendanceRepositoryInMemory };
