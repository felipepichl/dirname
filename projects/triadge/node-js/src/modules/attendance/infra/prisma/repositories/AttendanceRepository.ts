import { User } from '@modules/accounts/domain/User';
import { UserMappers } from '@modules/accounts/infra/prisma/mappers/UserMappers';
import { Attendance } from '@modules/attendance/domain/Attendance';
import { IAttendanceRepository } from '@modules/attendance/repositories/IAttendanceRepository';

import { PrismaSingleton } from '@shared/infra/prisma';

import { AttendanceMappers } from '../mappers/AttendanceMappers';

class AttendanceRepository implements IAttendanceRepository {
  async create({ date, isPresent, user_id }: Attendance): Promise<void> {
    await PrismaSingleton.getInstance().attendance.create({
      data: {
        date,
        present: isPresent,
        fk_user_id: user_id,
      },
    });
  }
  async listAll(): Promise<Attendance[]> {
    const result = await PrismaSingleton.getInstance().attendance.findMany();

    const mapper = AttendanceMappers.getMapper();

    return result.map(raw => mapper.toDomain(raw));
  }
  async listByUserId(user_id: string): Promise<User> {
    const result = await PrismaSingleton.getInstance().attendance.findFirst({
      where: { fk_user_id: user_id },
      include: { users: true },
    });

    const { users } = result;

    return UserMappers.getMapper().toDomain(users);
  }
  async listByDate(date: Date): Promise<User[]> {
    const result = await PrismaSingleton.getInstance().attendance.findMany({
      where: { date },
      include: { users: true },
    });

    const mapper = UserMappers.getMapper();

    return result.map(raw => mapper.toDomain(raw.users));
  }
}

export { AttendanceRepository };
