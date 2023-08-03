import { User } from '@modules/accounts/domain/User';
import { Attendance } from '@modules/attendance/domain/Attendance';
import { IAttendanceRepository } from '@modules/attendance/repositories/IAttendanceRepository';

import { IUseCase } from '@shared/core/domain/IUseCase';

type IResponse = Array<{
  attendance: Attendance;
  user: User;
}>;

class ListAllAttendancesUseCase implements IUseCase<void, IResponse> {
  constructor(private attendancesRepository: IAttendanceRepository) {}

  async execute(): Promise<IResponse> {
    const result = await this.attendancesRepository.listAll();

    return result.map(rawAttendance => {
      const { date, isPresent, user_id } = rawAttendance;

      const attendance = Attendance.createAttendance({
        date,
        isPresent,
        user_id,
      });

      const { name, email, password, phoneNumber } = rawAttendance.user;

      const user = User.createUser({
        name,
        email,
        password,
        phoneNumber,
      });

      return { attendance, user };
    });
  }
}

export { ListAllAttendancesUseCase };
