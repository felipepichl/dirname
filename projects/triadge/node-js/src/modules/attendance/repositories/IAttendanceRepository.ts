import { Attendance } from '../domain/Attendance';

interface IAttendanceRepository {
  create(attenance: Attendance): Promise<void>;
  listAll(): Promise<Attendance[]>;
  listInDateRange(startDate: Date, endDate: Date): Promise<Attendance[]>;
  // listByUserId(user_id: string): Promise<Attendance[]>;
  // listByDate(date: Date): Promise<User[]>;
}

export { IAttendanceRepository };
