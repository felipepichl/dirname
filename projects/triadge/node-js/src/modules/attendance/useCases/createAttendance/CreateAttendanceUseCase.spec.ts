// import { User } from '@modules/accounts/domain/User';
// import { HashProviderInMemory } from '@modules/accounts/providers/HashProvider/in-memory/HashProviderInMemory';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
// import { CreateUserUseCase } from '@modules/accounts/useCases/createUser/CreateUserUseCase';
import { Attendance } from '@modules/attendance/domain/Attendance';
import { AttendanceRepositoryInMemory } from '@modules/attendance/repositories/in-memory/AttendanceRepositoryInMemory';

import { CreateAttendanceUseCase } from './CreateAttendanceUseCase';

// import { AppError } from '@shared/error/AppError';

let usersRepositoryInMemory: UsersRepositoryInMemory;

let attendancesRepositryInMemory: AttendanceRepositoryInMemory;
let createAttendanceUseCase: CreateAttendanceUseCase;

describe('Create an attendance', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    attendancesRepositryInMemory = new AttendanceRepositoryInMemory();

    createAttendanceUseCase = new CreateAttendanceUseCase(
      usersRepositoryInMemory,
      attendancesRepositryInMemory,
    );
  });

  it('should be able to create a new attendance', async () => {
    const attendance = Attendance.createAttendance({
      date: new Date(),
      isPresent: true,
      user_id: 'user_id',
    });

    createAttendanceUseCase.execute(attendance);

    const attendanceCreated = await attendancesRepositryInMemory.listAll();

    const first = attendanceCreated[0];

    expect(attendanceCreated).toHaveLength(1);
    expect(first.isPresent).toBe(true);
    expect(first.user_id).toBe('user_id');
  });

  // it('should not be able to create a new user with same email another', async () => {
  //   const user = User.createUser({
  //     name: 'Jonh Due',
  //     email: 'johndue@example.com',
  //     password: 'hash123',
  //     phoneNumber: '51999999999',
  //   });

  //   await createUserUseCase.execute(user);

  //   await expect(createUserUseCase.execute(user)).rejects.toBeInstanceOf(
  //     AppError,
  //   );
  // });
});
