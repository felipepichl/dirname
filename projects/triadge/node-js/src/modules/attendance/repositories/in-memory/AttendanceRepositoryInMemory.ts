import { User } from '@modules/accounts/domain/User';
import { Attendance } from '@modules/attendance/domain/Attendance';

import { IAttendanceRepository } from '../IAttendanceRepository';

class AttendanceRepositoryInMemory implements IAttendanceRepository {
  private attendances: Attendance[] = [];

  async create(attenance: Attendance): Promise<void> {
    this.attendances.push(attenance);
  }
  async listByUserId(user_id: string): Promise<User> {
    const result = this.attendances.find(
      attendance => attendance.user.id.toString() === user_id,
    );

    return result.user;
  }
  async listByDate(date: Date): Promise<User[]> {
    const result = this.attendances.filter(
      attendance => attendance.date === date,
    );

    return result.map(attendances => attendances.user);
  }
}

export { AttendanceRepositoryInMemory };
