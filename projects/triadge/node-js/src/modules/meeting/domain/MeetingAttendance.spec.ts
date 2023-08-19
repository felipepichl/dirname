import { MeetingAttendance } from './MeetingAttendance'

describe('[Meeting] - Create a new MeetingAttendance', () => {
  it('should be able to create a new instance of user attendances', () => {
    const meetingAttendance = MeetingAttendance.createMeetingAttendance({
      user_ids: ['user_id_a', 'user_id_b'],
      attendance_id: 'attendance_id',
    })

    expect(meetingAttendance instanceof MeetingAttendance).toBe(true)
    expect(meetingAttendance).toBeTruthy()
  })
})
