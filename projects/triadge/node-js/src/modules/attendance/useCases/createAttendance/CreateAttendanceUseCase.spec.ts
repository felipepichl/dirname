// import { User } from '@modules/accounts/domain/User';
// import { HashProviderInMemory } from '@modules/accounts/providers/HashProvider/in-memory/HashProviderInMemory';
import { User } from '@modules/accounts/domain/User';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
// import { CreateUserUseCase } from '@modules/accounts/useCases/createUser/CreateUserUseCase';
import { Attendance } from '@modules/attendance/domain/Attendance';
import { AttendanceRepositoryInMemory } from '@modules/attendance/repositories/in-memory/AttendanceRepositoryInMemory';

import { AppError } from '@shared/error/AppError';

import { CreateAttendanceUseCase } from './CreateAttendanceUseCase';

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
    const user = User.createUser({
      name: 'Jonh Due',
      email: 'johndue@example.com',
      password: 'hash123',
      phoneNumber: '51999999999',
    });

    await usersRepositoryInMemory.create(user);

    const { id } = user;

    const attendance = Attendance.createAttendance({
      date: new Date(),
      isPresent: true,
      user_id: id.toString(),
    });

    await createAttendanceUseCase.execute(attendance);

    const attendanceCreated = await attendancesRepositryInMemory.listAll();

    const first = attendanceCreated[0];

    expect(attendanceCreated).toHaveLength(1);
    expect(first.isPresent).toBe(true);
    expect(first.user_id).toBe(id.toString());
  });

  it('should not be able to create a new user with same email another', async () => {
    const attendance = Attendance.createAttendance({
      date: new Date(),
      isPresent: true,
      user_id: 'user_not_found',
    });

    await createAttendanceUseCase.execute(attendance);

    await expect(
      createAttendanceUseCase.execute(attendance),
    ).rejects.toBeInstanceOf(AppError);
  });
});
