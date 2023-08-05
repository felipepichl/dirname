import { UserAttendance } from './UserAttendance';

describe('Create a new UserAttendance', () => {
  it('should be able to create a new instance of user attendances', () => {
    const userAttendance = UserAttendance.createUserAttendance({
      user_id: 'user_id',
      attendance_id: 'attendance_id',
    });

    expect(userAttendance instanceof UserAttendance).toBe(true);
    expect(userAttendance).toBeTruthy();
  });
});
