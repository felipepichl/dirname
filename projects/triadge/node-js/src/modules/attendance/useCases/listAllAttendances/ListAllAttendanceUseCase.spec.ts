import { User } from '@modules/accounts/domain/User';
import { Attendance } from '@modules/attendance/domain/Attendance';
import { AttendanceRepositoryInMemory } from '@modules/attendance/repositories/in-memory/AttendanceRepositoryInMemory';

import { ListAllAttendancesUseCase } from './ListAllAttendancesUseCase';

let listAllAttendancesUseCase: ListAllAttendancesUseCase;
let attendanceRepositoryInMemory: AttendanceRepositoryInMemory;

describe('List All Attendances', () => {
  beforeEach(() => {
    attendanceRepositoryInMemory = new AttendanceRepositoryInMemory();
    listAllAttendancesUseCase = new ListAllAttendancesUseCase(
      attendanceRepositoryInMemory,
    );
  });

  it('should be able to list all attendances with their users', async () => {
    const user1 = User.createUser({
      name: 'User Test1',
      email: 'usertest1@example.com',
      password: 'test123',
      phoneNumber: '1234567890',
    });

    const user2 = User.createUser({
      name: 'User Test2',
      email: 'usertest2@example.com',
      password: 'test123',
      phoneNumber: '1234567890',
    });

    const attendance1 = Attendance.createAttendance({
      date: new Date(),
      isPresent: true,
      user_id: user1.id.toString(),
      user: user1,
    });

    const attendance2 = Attendance.createAttendance({
      date: new Date(),
      isPresent: false,
      user_id: user2.id.toString(),
      user: user2,
    });

    await attendanceRepositoryInMemory.create(attendance1);
    await attendanceRepositoryInMemory.create(attendance2);

    const attendances = await listAllAttendancesUseCase.execute();

    expect(attendances.length).toBe(2);
    expect(attendances[0].user).toBe(user1);
    expect(attendances[1].user).toBe(user2);
  });
});
