import { Attendance } from './Attendance';

describe('[Attendance] - Create a new Attendance', () => {
  it('should be able to create a new instance of attendance', () => {
    const attendance = Attendance.createAttendance({
      date: new Date(),
    });

    expect(attendance instanceof Attendance).toBe(true);
    expect(attendance).toBeTruthy();
  });
});
