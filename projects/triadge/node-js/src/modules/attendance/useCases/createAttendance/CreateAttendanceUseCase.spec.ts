// import { User } from '@modules/accounts/domain/User';
// import { HashProviderInMemory } from '@modules/accounts/providers/HashProvider/in-memory/HashProviderInMemory';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
// import { CreateUserUseCase } from '@modules/accounts/useCases/createUser/CreateUserUseCase';
import { Attendance } from '@modules/attendance/domain/Attendance';
import { AttendanceRepositoryInMemory } from '@modules/attendance/repositories/in-memory/AttendanceRepositoryInMemory';

import { CreateAttendanceUseCase } from './CreateAttendanceUseCase';

// import { AppError } from '@shared/error/AppError';

let usersRepositoryInMemory: UsersRepositoryInMemory;
// let hashProviderInMemory: HashProviderInMemory;
// let createUserUseCase: CreateUserUseCase;

let attendancesRepositryInMemory: AttendanceRepositoryInMemory;
let createAttendanceUseCase: CreateAttendanceUseCase;

describe('Create an attendance', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    // hashProviderInMemory = new HashProviderInMemory();
    // createUserUseCase = new CreateUserUseCase(
    //   usersRepositoryInMemory,
    //   hashProviderInMemory,
    // );

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

    const attenanceCreated = attendancesRepositryInMemory.listAll();

    const first = attenanceCreated[0];

    console.log(first);
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
