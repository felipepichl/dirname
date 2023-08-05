import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IAttendanceRepository } from '@modules/attendance/repositories/IAttendanceRepository';
import { UserAttendance } from '@modules/usersAttendances/domain/UserAttendance';
import { IUserAttendanceRepository } from '@modules/usersAttendances/repositories/IUserAttendanceRepository';

import { IUseCase } from '@shared/core/domain/IUseCase';
import { AppError } from '@shared/error/AppError';

interface IRequest {
  user_id: string;
  attendance_id: string;
}

class CreateUserAttendance implements IUseCase<IRequest, void> {
  constructor(
    private usersRepository: IUsersRepository,
    private attendancesRepository: IAttendanceRepository,
    private userAttendance: IUserAttendanceRepository,
  ) {}

  async execute({ user_id, attendance_id }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found', 400);
    }

    const attendance = await this.attendancesRepository.findById(attendance_id);

    if (!attendance) {
      throw new AppError('Attendance not found', 400);
    }

    const userAttendance = UserAttendance.createUserAttendance({
      user_id: user.id.toString(),
      attendance_id: attendance.id.toString(),
    });

    await this.userAttendance.create(userAttendance);
  }
}

export { CreateUserAttendance };
