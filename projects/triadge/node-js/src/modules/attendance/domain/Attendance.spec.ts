import { Attendance } from './Attendance'

describe('[Attendance] - Create a new instance of Attendance', () => {
  it('should be able to create a new instance of attendances', () => {
    const attendance = Attendance.createAttendance({
      userIds: ['userIdA', 'userIdB'],
      meetingId: 'meetingId',
    })

    expect(attendance instanceof Attendance).toBe(true)
    expect(attendance).toBeTruthy()
  })
})
