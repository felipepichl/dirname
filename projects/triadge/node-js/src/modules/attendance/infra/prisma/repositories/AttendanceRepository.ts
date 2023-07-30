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

    return AttendanceMappers.getMapper().toDomainArray(result);
  }
  async listByUserId(user_id: string): Promise<Attendance[]> {
    const result = await PrismaSingleton.getInstance().attendance.findMany({
      where: {
        fk_user_id: user_id,
      },
      include: { users: true },
    });

    return AttendanceMappers.getMapper().toDomainArray(result);
  }
  async listByDate(date: Date): Promise<User[]> {
    const result = await PrismaSingleton.getInstance().attendance.findMany({
      where: { date },
      include: { users: true },
    });

    const mapper = UserMappers.getMapper();

    return result.map(raw => mapper.toDomain(raw.users));
  }
  async listInDateRange(startDate: Date, endDate: Date): Promise<Attendance[]> {
    const result = await PrismaSingleton.getInstance().attendance.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: { users: true },
    });

    return AttendanceMappers.getMapper().toDomainArray(result);
  }
}

export { AttendanceRepository };
