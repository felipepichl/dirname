import { MeetingAttendance } from './MeetingAttendance'

describe('[Meeting] - Create a new MeetingAttendance', () => {
  it('should be able to create a new instance of user attendances', () => {
    const meetingAttendance = MeetingAttendance.createMeetingAttendance({
      userIds: ['userIdA', 'userIdB'],
      attendanceId: 'attendanceId',
    })

    expect(meetingAttendance instanceof MeetingAttendance).toBe(true)
    expect(meetingAttendance).toBeTruthy()
  })
})
