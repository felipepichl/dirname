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
    const user1 = User.createUser({
      name: 'Test User1',
      email: 'user1@test.com',
      password: '123456',
      phoneNumber: '123456789',
    });

    const user2 = User.createUser({
      name: 'Test User2',
      email: 'user2@test.com',
      password: '123456',
      phoneNumber: '123456789',
    });

    await usersRepositoryInMemory.create(user1);
    await usersRepositoryInMemory.create(user2);

    const attendanceDate = new Date();
    const attendance = Attendance.createAttendance({
      date: attendanceDate,
    });

    await attendanceRepositoryInMemory.create(attendance);

    const { id: user_id_1 } = await usersRepositoryInMemory.findByEmail(
      'user1@test.com',
    );
    const { id: user_id_2 } = await usersRepositoryInMemory.findByEmail(
      'user2@test.com',
    );

    const { id: attendance_id } = await attendanceRepositoryInMemory.findByDate(
      attendanceDate,
    );

    const user_ids = [user_id_1.toString(), user_id_2.toString()];

    await createUserAttendance.execute({
      user_ids,
      attendance_id: attendance_id.toString(),
    });

    await userAttendanceRepositoryInMemory.findByUserIdsAndAttendanceId(
      user_ids,
      attendance_id.toString(),
    );

    const userAttendanceRecords =
      await userAttendanceRepositoryInMemory.findByUserIdsAndAttendanceId(
        user_ids,
        attendance_id.toString(),
      );

    expect(userAttendanceRecords).toHaveLength(1);

    const storedUserIds = userAttendanceRecords.flatMap(ua => ua.user_ids);
    expect(storedUserIds).toContain(user_id_1.toString());
    expect(storedUserIds).toContain(user_id_2.toString());

    userAttendanceRecords.forEach(record => {
      expect(record.attendance_id).toBe(attendance_id.toString());
    });
  });

  // it('should not be able to create a UserAttendance with non-existent user', async () => {
  //   const attendanceDate = new Date();
  //   const attendance = Attendance.createAttendance({
  //     date: attendanceDate,
  //   });

  //   await attendanceRepositoryInMemory.create(attendance);

  //   const { id } = await attendanceRepositoryInMemory.findByDate(
  //     attendanceDate,
  //   );

  //   await expect(
  //     createUserAttendance.execute({
  //       user_id: 'non-existent-user_id',
  //       attendance_id: id.toString(),
  //     }),
  //   ).rejects.toEqual(new AppError('User not found', 404));
  // });

  // it('should not be able to create a UserAttendance with non-existent attendance', async () => {
  //   const user = User.createUser({
  //     name: 'Test User',
  //     email: 'user@test.com',
  //     password: '123456',
  //     phoneNumber: '123456789',
  //   });

  //   await usersRepositoryInMemory.create(user);

  //   const attendanceDate = new Date();
  //   const attendance = Attendance.createAttendance({
  //     date: attendanceDate,
  //   });

  //   await attendanceRepositoryInMemory.create(attendance);

  //   const { id } = await usersRepositoryInMemory.findByEmail('user@test.com');

  //   await expect(
  //     createUserAttendance.execute({
  //       user_id: id.toString(),
  //       attendance_id: 'non-existent-attendance_id',
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
