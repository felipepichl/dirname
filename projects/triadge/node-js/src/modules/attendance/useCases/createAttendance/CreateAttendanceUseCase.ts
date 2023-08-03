import { Attendance } from '@modules/attendance/domain/Attendance';
import { IAttendanceRepository } from '@modules/attendance/repositories/IAttendanceRepository';
import { inject, injectable } from 'tsyringe';

import { IUseCase } from '@shared/core/domain/IUseCase';

interface IRequest {
  date: Date;
}

@injectable()
class CreateAttendanceUseCase implements IUseCase<IRequest, void> {
  constructor(
    @inject('AttendanceRepository')
    private attendanceRepositry: IAttendanceRepository,
  ) {}

  async execute({ date }: IRequest): Promise<void> {
    const attendance = Attendance.createAttendance({
      date,
    });

    await this.attendanceRepositry.create(attendance);
  }
}

export { CreateAttendanceUseCase };
