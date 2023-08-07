import { User } from '@modules/accounts/domain/User';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { Attendance } from '@modules/attendance/domain/Attendance';
import { AttendanceRepositoryInMemory } from '@modules/attendance/repositories/in-memory/AttendanceRepositoryInMemory';
import { UserAttendanceRepositoryInMemory } from '@modules/usersAttendances/repositories/in-memory/UserAttendanceRepositoryInMemory';
import { CreateUserAttendance } from '@modules/usersAttendances/useCases/createUserAttendance/CreateUserAttendance';

// import { AppError } from '@shared/error/AppError';

let createUserAttendance: CreateUserAttendance;
let userAttendanceRepositoryInMemory: UserAttendanceRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let attendanceRepositoryInMemory: AttendanceRepositoryInMemory;

describe('Create User Attendance', () => {
  beforeEach(() => {
    userAttendanceRepositoryInMemory = new UserAttendanceRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    attendanceRepositoryInMemory = new AttendanceRepositoryInMemory();
    createUserAttendance = new CreateUserAttendance(
      usersRepositoryInMemory,
      attendanceRepositoryInMemory,
      userAttendanceRepositoryInMemory,
    );
  });

  it('should be able to create a new UserAttendance', async () => {
    const user = User.createUser({
      name: 'Test User',
      email: 'user@test.com',
      password: '123456',
      phoneNumber: '123456789',
    });

    await usersRepositoryInMemory.create(user);

    const attendanceDate = new Date();
    const attendance = Attendance.createAttendance({
      date: attendanceDate,
    });

    await attendanceRepositoryInMemory.create(attendance);

    const { id: user_id } = await usersRepositoryInMemory.findByEmail(
      'user@test.com',
    );
    const { id: attendance_id } = await attendanceRepositoryInMemory.findByDate(
      attendanceDate,
    );

    await createUserAttendance.execute({
      user_id: user_id.toString(),
      attendance_id: attendance_id.toString(),
    });

    const userAttendance =
      await userAttendanceRepositoryInMemory.findByUserIdAndAttendanceId(
        user_id.toString(),
        attendance_id.toString(),
      );

    expect(userAttendance).toBeTruthy();
    expect(userAttendance.user_id).toEqual(user_id);
    expect(userAttendance.attendances.id).toEqual(attendance_id);
  });

  // it('should not be able to create a UserAttendance with non-existent user', async () => {
  //   const attendance = await attendanceRepositoryInMemory.create({
  //     date: new Date(),
  //   });

  //   await expect(
  //     createUserAttendance.execute({
  //       user_id: 'non-existent user id',
  //       attendance_id: attendance.id,
  //     }),
  //   ).rejects.toEqual(new AppError('User not found', 404));
  // });

  // it('should not be able to create a UserAttendance with non-existent attendance', async () => {
  //   const user = await usersRepositoryInMemory.create({
  //     name: 'Test User',
  //     email: 'user@test.com',
  //     password: '123456',
  //   });

  //   await expect(
  //     createUserAttendance.execute({
  //       user_id: user.id,
  //       attendance_id: 'non-existent attendance id',
  //     }),
  //   ).rejects.toEqual(new AppError('Attendance not found', 404));
  // });

  // it('should not be able to create a UserAttendance if it already exists', async () => {
  //   const user = await usersRepositoryInMemory.create({
  //     name: 'Test User',
  //     email: 'user@test.com',
  //     password: '123456',
  //   });
  //   const attendance = await attendanceRepositoryInMemory.create({
  //     date: new Date(),
  //   });

  //   await createUserAttendance.execute({
  //     user_id: user.id,
  //     attendance_id: attendance.id,
  //   });

  //   await expect(
  //     createUserAttendance.execute({
  //       user_id: user.id,
  //       attendance_id: attendance.id,
  //     }),
  //   ).rejects.toEqual(new AppError('UserAttendance already exists', 409));
  // });
});
