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
      include: { user: true, attendance: true },
    });

    return UserAttendanceMapper.getMapper().toDomainArray(result);
  }
  async findAllByAttendanceId(
    attendance_id: string,
  ): Promise<UserAttendance[]> {
    const result = await PrismaSingleton.getInstance().userAttendance.findMany({
      where: { attendanceId: attendance_id },
      include: { user: true, attendance: true },
    });

    return UserAttendanceMapper.getMapper().toDomainArray(result);
  }
  async findByUserIdAndAttendanceId(
    user_id: string,
    attendance_id: string,
  ): Promise<UserAttendance> {
    const result = await PrismaSingleton.getInstance().userAttendance.findFirst(
      {
        where: {
          userId: user_id,
          attendanceId: attendance_id,
        },
        include: {
          user: true,
          attendance: true,
        },
      },
    );

    return UserAttendanceMapper.getMapper().toDomain(result);
  }
  async findByUserIdAndDate(
    user_id: string,
    date: Date,
  ): Promise<UserAttendance> {
    const result = await PrismaSingleton.getInstance().userAttendance.findMany({
      where: {
        userId: user_id,
      },
      include: { attendance: true },
    });

    const filteredResults = result.find(
      userAttendance => userAttendance.attendance.date === date,
    );

    return UserAttendanceMapper.getMapper().toDomain(filteredResults);
  }
  async listByDate(date: Date): Promise<UserAttendance[]> {
    const result = await PrismaSingleton.getInstance().userAttendance.findMany({
      include: {
        user: true,
        attendance: true,
      },
    });

    const filteredResults = result.filter(
      userAttendance => userAttendance.attendance.date === date,
    );

    return UserAttendanceMapper.getMapper().toDomainArray(filteredResults);
  }
  async listInDateRange(
    startDate: Date,
    endDate: Date,
  ): Promise<UserAttendance[]> {
    const result = await PrismaSingleton.getInstance().userAttendance.findMany({
      include: {
        user: true,
        attendance: true,
      },
    });

    const filteredResults = result.filter(
      userAttendance =>
        userAttendance.attendance.date >= startDate &&
        userAttendance.attendance.date <= endDate,
    );

    return UserAttendanceMapper.getMapper().toDomainArray(filteredResults);
  }
}

export { UserAttendanceRepository };
