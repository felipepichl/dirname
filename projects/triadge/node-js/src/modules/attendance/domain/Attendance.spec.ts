import { Attendance } from './Attendance';

describe('Create a new Attendance', () => {
  it('should be able to create a new instance of attendance', () => {
    const attendance = Attendance.createAttendance({
      date: new Date(),
      isPresent: true,
      user_id: 'user_id',
    });

    expect(attendance instanceof Attendance).toBe(true);
    expect(attendance).toBeTruthy();
    expect(attendance.user_id).toBe('user_id');
  });
});
