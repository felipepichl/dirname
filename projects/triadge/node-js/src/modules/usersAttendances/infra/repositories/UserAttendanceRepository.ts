import { UserAttendance } from '@modules/usersAttendances/domain/UserAttendance';
import { IUserAttendanceRepository } from '@modules/usersAttendances/repositories/IUserAttendanceRepository';

import { PrismaSingleton } from '@shared/infra/prisma';

import { UserAttendanceMapper } from '../mappers/UserAttendanceMapper';

class UserAttendanceRepository implements IUserAttendanceRepository {
  async create({ user_id, attendance_id }: UserAttendance): Promise<void> {
    await PrismaSingleton.getInstance().userAttendance.create({
      data: {
        userId: user_id,
        attendanceId: attendance_id,
        present: true,
      },
    });
  }
  async findAllByUserId(user_id: string): Promise<UserAttendance[]> {
    const result = await PrismaSingleton.getInstance().userAttendance.findMany({
      where: { userId: user_id },
    });

    return UserAttendanceMapper.getMapper().toDomainArray(result);
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
