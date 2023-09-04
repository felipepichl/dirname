import { Meeting } from '@modules/meeting/domain/Meeting'
import { Attendance } from '@modules/attendance/domain/Attendance'

import { MeetingRepositoryInMemory } from '@modules/meeting/repositories/in-memory/MeetingRepositoryInMemory'

import { FindMeetingByDate } from './FindMeetingByDate'

import { AppError } from '@shared/error/AppError'

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
      userIds: ['fakeUser1'],
      meetingId: 'fakeMeetingId1',
    })

    const fakeAttendance2 = Attendance.createAttendance({
      userIds: ['fakeUser2'],
      meetingId: 'fakeMeetingId2',
    })

    const fakeMeeting = Meeting.createMeeting({
      date: fakeDate,
      attendances: [fakeAttendance1, fakeAttendance2],
    })

    await meetingsRepositoryInMemory.create(fakeMeeting)

    const response = await findMeetingByDate.execute({
      date: fakeDate,
    })

    expect(response.meeting.date).toEqual(fakeMeeting.date)

    const retrievedAttendances = response.meeting.attendees
    expect(retrievedAttendances).toHaveLength(2)

    const attendeeIds = retrievedAttendances.map((attendee) => attendee.id)
    expect(attendeeIds).toContain('fakeUser1')
    expect(attendeeIds).toContain('fakeUser2')
  })

  it('should throw an AppError if no meeting is found for the specified date', async () => {
    const fakeDate = new Date(2022, 3, 16)

    await expect(
      findMeetingByDate.execute({
        date: fakeDate,
      }),
    ).rejects.toEqual(new AppError('Meeting not found', 404))
  })
})
