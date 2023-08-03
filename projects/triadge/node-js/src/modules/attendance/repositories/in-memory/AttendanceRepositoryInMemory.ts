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
  async listInDateRange(startDate: Date, endDate: Date): Promise<Attendance[]> {
    return this.attendances.filter(
      attendance => attendance.date >= startDate && attendance.date <= endDate,
    );
  }
}

export { AttendanceRepositoryInMemory };
