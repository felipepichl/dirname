import { Attendance } from '@modules/attendance/domain/Attendance';
import { IAttendanceRepository } from '@modules/attendance/repositories/IAttendanceRepository';

import { IUseCase } from '@shared/core/domain/IUseCase';

type IResponse = Attendance[];

class ListAllAttendancesUseCase implements IUseCase<void, IResponse> {
  constructor(private attendancesRepository: IAttendanceRepository) {}

  async execute(): Promise<IResponse> {
    const result = await this.attendancesRepository.listAll();

    return result;
  }
}

export { ListAllAttendancesUseCase };
