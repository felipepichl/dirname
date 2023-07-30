import { User } from '@modules/accounts/domain/User';
import { Attendance } from '@modules/attendance/domain/Attendance';

import { IAttendanceRepository } from '../IAttendanceRepository';

class AttendanceRepositoryInMemory implements IAttendanceRepository {
  private attendances: Attendance[] = [];

  async create(attenance: Attendance): Promise<void> {
    this.attendances.push(attenance);
  }
  async listAll(): Promise<Attendance[]> {
    return this.attendances;
  }
  async listByUserId(user_id: string): Promise<Attendance[]> {
    return this.attendances.filter(
      attendance => attendance.user.id.toString() === user_id,
    );
  }
  async listByDate(date: Date): Promise<User[]> {
    const result = this.attendances.filter(
      attendance => attendance.date === date,
    );

    return result.map(attendances => attendances.user);
  }
  async listInDateRange(startDate: Date, endDate: Date): Promise<Attendance[]> {
    return this.attendances.filter(
      attendance => attendance.date >= startDate && attendance.date <= endDate,
    );
  }
}

export { AttendanceRepositoryInMemory };
