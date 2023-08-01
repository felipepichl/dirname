import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { Attendance } from '@modules/attendance/domain/Attendance';
import { IAttendanceRepository } from '@modules/attendance/repositories/IAttendanceRepository';
import { inject, injectable } from 'tsyringe';

import { IUseCase } from '@shared/core/domain/IUseCase';
import { AppError } from '@shared/error/AppError';

interface IRequest {
  date: Date;
  isPresent: boolean;
  user_id: string;
}

@injectable()
class CreateAttendanceUseCase implements IUseCase<IRequest, void> {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('AttendanceRepository')
    private attendanceRepositry: IAttendanceRepository,
  ) {}

  async execute({ date, isPresent, user_id }: IRequest): Promise<void> {
    const userAllReadyExists = await this.usersRepository.findById(user_id);

    if (!userAllReadyExists) {
      throw new AppError('Users not found', 400);
    }

    const attendance = Attendance.createAttendance({
      date,
      isPresent,
      user_id,
    });

    await this.attendanceRepositry.create(attendance);
  }
}

export { CreateAttendanceUseCase };
