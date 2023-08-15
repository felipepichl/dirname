import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IAttendanceRepository } from '@modules/attendance/repositories/IAttendanceRepository';
import { UserAttendance } from '@modules/meeting/domain/UserAttendance';
import { IUserAttendanceRepository } from '@modules/meeting/repositories/IUserAttendanceRepository';
import { inject, injectable } from 'tsyringe';

import { IUseCase } from '@shared/core/domain/IUseCase';
import { AppError } from '@shared/error/AppError';

interface IRequest {
  user_ids: string[];
  attendance_id: string;
}

@injectable()
class CreateUserAttendance implements IUseCase<IRequest, void> {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('AttendanceRepository')
    private attendancesRepository: IAttendanceRepository,
    @inject('UserAttendanceRepository')
    private userAttendance: IUserAttendanceRepository,
  ) {}

  async execute({ user_ids, attendance_id }: IRequest): Promise<void> {
    const users = await this.usersRepository.findByIds(user_ids);

    if (users.length !== user_ids.length) {
      const foundUserIds = users.map(user => user.id.toString());
      const notFoundUserIds = user_ids.filter(id => !foundUserIds.includes(id));

      throw new AppError(
        `Users with IDs ${notFoundUserIds.join(', ')} not found`,
        404,
      );
    }

    const attendance = await this.attendancesRepository.findById(attendance_id);

    if (!attendance) {
      throw new AppError('Attendance not found', 404);
    }

    // const existingUserAttendance =
    //   await this.userAttendance.findByUserIdAndAttendanceId(
    //     user_ids,
    //     attendance_id,
    //   );

    // if (existingUserAttendance) {
    //   throw new AppError('UserAttendance already exists', 409);
    // }

    const promises = user_ids.map(async user_id => {
      const existingUserAttendance =
        await this.userAttendance.findByUserIdAndAttendanceId(
          user_id,
          attendance_id,
        );
      if (existingUserAttendance) {
        throw new AppError(
          `UserAttendance for user ID ${user_id} and attendance ID ${attendance_id} already exists`,
          409,
        );
      }
    });

    await Promise.all(promises);

    const userAttendance = UserAttendance.createUserAttendance({
      user_ids,
      attendance_id: attendance.id.toString(),
    });

    await this.userAttendance.create(userAttendance);
  }
}

export { CreateUserAttendance };
