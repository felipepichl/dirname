import { Attendance } from '@modules/attendance/domain/Attendance';
import { IAttendanceRepository } from '@modules/attendance/repositories/IAttendanceRepository';

import { PrismaSingleton } from '@shared/infra/prisma';

import { AttendanceMappers } from '../mappers/AttendanceMappers';

class AttendanceRepository implements IAttendanceRepository {
  async create({ date }: Attendance): Promise<void> {
    await PrismaSingleton.getInstance().attendance.create({
      data: {
        date,
      },
    });
  }
  async listAll(): Promise<Attendance[]> {
    const result = await PrismaSingleton.getInstance().attendance.findMany();

    return AttendanceMappers.getMapper().toDomainArray(result);
  }
  async listInDateRange(startDate: Date, endDate: Date): Promise<Attendance[]> {
    const result = await PrismaSingleton.getInstance().attendance.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    return AttendanceMappers.getMapper().toDomainArray(result);
  }
  async findByDate(date: Date): Promise<Attendance> {
    const result = await PrismaSingleton.getInstance().attendance.findFirst({
      where: { date },
    });

    return AttendanceMappers.getMapper().toDomain(result);
  }
  async findAllByDate(date: Date): Promise<Attendance[]> {
    const result = await PrismaSingleton.getInstance().attendance.findMany({
      where: { date },
    });

    return AttendanceMappers.getMapper().toDomainArray(result);
  }
  async findById(id: string): Promise<Attendance> {
    const result = await PrismaSingleton.getInstance().attendance.findFirst({
      where: { id },
    });

    return AttendanceMappers.getMapper().toDomain(result);
  }
}

export { AttendanceRepository };
