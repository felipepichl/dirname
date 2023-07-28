import { User } from '@modules/accounts/domain/User';

import { Attendance } from '../domain/Attendance';

interface IAttendanceRepository {
  create(attenance: Attendance): Promise<void>;
  listAll(): Promise<Attendance[]>;
  listByUserId(user_id: string): Promise<User>;
  listByDate(date: Date): Promise<User[]>;
}

export { IAttendanceRepository };
