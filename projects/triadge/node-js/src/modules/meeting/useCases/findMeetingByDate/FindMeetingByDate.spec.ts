import { User } from '@modules/accounts/domain/User'
import { Attendance } from '@modules/attendance/domain/Attendance'
import { Meeting } from '@modules/meeting/domain/Meeting'
import { MeetingRepositoryInMemory } from '@modules/meeting/repositories/in-memory/MeetingRepositoryInMemory'

import { FindMeetingByDate } from './FindMeetingByDate'

let meetingsRepositoryInMemory: MeetingRepositoryInMemory
let findMeetingByDate: FindMeetingByDate

describe('[Meeting] - Find meeting by date', () => {
  beforeEach(() => {
    meetingsRepositoryInMemory = new MeetingRepositoryInMemory()
    findMeetingByDate = new FindMeetingByDate(meetingsRepositoryInMemory)
  })

  it('should return a meeting and its attendees when found by date', async () => {
    const fakeDate = new Date(2022, 3, 16)

    const fakeAttendance1 = Attendance.createAttendance({
      userIds: ['fakeUser1', 'fakeUser2'],
      meetingId: 'fakeMeetingId1',
    })

    const fakeAttendance2 = Attendance.createAttendance({
      userIds: ['fakeUser2', 'fakeUser2'],
      meetingId: 'fakeMeetingId2',
    })

    const fakeMeeting = Meeting.createMeeting({
      date: fakeDate,
      attendences: [fakeAttendance1, fakeAttendance2],
    })

    await meetingsRepositoryInMemory.create(fakeMeeting)

    const response = await findMeetingByDate.execute({
      date: fakeDate,
    })

    expect(response.meetings).toEqual(fakeMeeting)
  })
})
