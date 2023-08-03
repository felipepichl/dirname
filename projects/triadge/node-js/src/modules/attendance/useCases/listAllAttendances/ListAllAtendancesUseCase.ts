import { Attendance } from '@modules/attendance/domain/Attendance';
import { AttendanceMappers } from '@modules/attendance/infra/prisma/mappers/AttendanceMappers';
import { IAttendanceRepository } from '@modules/attendance/repositories/IAttendanceRepository';

import { IUseCase } from '@shared/core/domain/IUseCase';

interface IResponse {
  attendances: Attendance;
}

class ListAllAtendancesUseCase implements IUseCase<void, IResponse[]> {
  constructor(private attendancesRepository: IAttendanceRepository) {}

  async execute(): Promise<IResponse[]> {
    const result = await this.attendancesRepository.listAll();
  }
}

export { ListAllAtendancesUseCase };
