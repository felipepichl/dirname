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
      attendences: [fakeAttendance1, fakeAttendance2],
    })

    await meetingsRepositoryInMemory.create(fakeMeeting)

    const response = await findMeetingByDate.execute({
      date: fakeDate,
    })

    expect(response.meeting).toEqual(fakeMeeting)
    expect(response.meeting.date).toEqual(fakeDate)

    const retrievedAttendances = response.meeting.attendances
    expect(retrievedAttendances).toHaveLength(2)

    const attendeesFromAttendance1 = retrievedAttendances[0].userIds
    const attendeesFromAttendance2 = retrievedAttendances[1].userIds

    expect(attendeesFromAttendance1).toContain('fakeUser1')
    expect(attendeesFromAttendance2).toContain('fakeUser2')
  })

  it('should throw an AppError if no meeting is found for the specified date', async () => {
    const fakeDate = new Date(2022, 3, 16) // suponha que não há reuniões para esta data

    // Neste caso, não estamos adicionando nenhuma reunião no repositório em memória

    await expect(
      findMeetingByDate.execute({
        date: fakeDate,
      }),
    ).rejects.toEqual(new AppError('Meeting not found', 404))
  })
})
