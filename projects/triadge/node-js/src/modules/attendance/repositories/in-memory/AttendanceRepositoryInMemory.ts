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
  async findByDate(date: Date): Promise<Attendance[]> {
    return this.attendances.filter(attendance => attendance.date === date);
  }
  async findById(id: string): Promise<Attendance> {
    return this.attendances.find(attendance => attendance.id.toString() === id);
  }
}

export { AttendanceRepositoryInMemory };
