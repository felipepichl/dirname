import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { Attendance } from '@modules/attendance/domain/Attendance';
import { IAttendanceRepository } from '@modules/attendance/repositories/IAttendanceRepository';

import { IUseCase } from '@shared/core/domain/IUseCase';
import { AppError } from '@shared/error/AppError';

interface IRequest {
  date: Date;
  isPresent: boolean;
  user_id: string;
}

class CreateAttendanceUseCase implements IUseCase<IRequest, void> {
  constructor(
    private usersRepository: IUsersRepository,
    private attendancesRepositry: IAttendanceRepository,
  ) {}

  async execute({ date, isPresent, user_id }: IRequest): Promise<void> {
    const userAllReadyExists = await this.usersRepository.findById(user_id);

    if (userAllReadyExists) {
      throw new AppError('Users already exists', 400);
    }

    const attendance = Attendance.createAttendance({
      date,
      isPresent,
      user_id,
    });

    await this.attendancesRepositry.create(attendance);
  }
}

export { CreateAttendanceUseCase };
