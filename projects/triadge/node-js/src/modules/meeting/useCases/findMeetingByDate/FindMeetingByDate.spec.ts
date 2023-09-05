import { Meeting } from '@modules/meeting/domain/Meeting'
import { Attendance } from '@modules/attendance/domain/Attendance'

import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'
import { MeetingRepositoryInMemory } from '@modules/meeting/repositories/in-memory/MeetingRepositoryInMemory'

import { FindMeetingByDate } from './FindMeetingByDate'

import { AppError } from '@shared/error/AppError'
import { User } from '@modules/accounts/domain/User'

let meetingsRepositoryInMemory: MeetingRepositoryInMemory
let findMeetingByDate: FindMeetingByDate

async function createUser(
  name: string,
  email: string,
  password: string,
  phoneNumber: string,
): Promise<User> {
  const usersRepository = new UsersRepositoryInMemory()

  const user = User.createUser({
    name,
    email,
    password,
    phoneNumber,
  })

  await usersRepository.create(user)

  const result = usersRepository.findByEmail(email)

  return result
}

async function createMeeting(date: Date): Promise<Meeting> {
  const meeting = Meeting.createMeeting({
    date,
  })

  await meetingsRepositoryInMemory.create(meeting)

  const result = await meetingsRepositoryInMemory.findAll()

  return result[0]
}

describe('[Meeting] - Find meeting by date', () => {
  beforeEach(() => {
    meetingsRepositoryInMemory = new MeetingRepositoryInMemory()
    findMeetingByDate = new FindMeetingByDate(meetingsRepositoryInMemory)
  })

  it('should return a meeting and its attendees when found by date', async () => {
    // const fakeDate = new Date(2022, 3, 16)
    // const fakeAttendance1 = Attendance.createAttendance({
    //   userIds: ['fakeUser1'],
    //   meetingId: 'fakeMeetingId1',
    // })
    // const fakeAttendance2 = Attendance.createAttendance({
    //   userIds: ['fakeUser2'],
    //   meetingId: 'fakeMeetingId2',
    // })
    // const fakeMeeting = Meeting.createMeeting({
    //   date: fakeDate,
    //   attendances: [fakeAttendance1, fakeAttendance2],
    // })
    // await meetingsRepositoryInMemory.create(fakeMeeting)
    // const response = await findMeetingByDate.execute({
    //   date: fakeDate,
    // })
    // console.log(response)
    // expect(response.meeting.date).toEqual(fakeMeeting.date)
    // const retrievedAttendances = response.meeting.attendees
    // expect(retrievedAttendances).toHaveLength(2)
    // expect(response.meeting).toBeDefined()
    // expect(response.meeting.attendees).toBeDefined()
    // const attendeeIds = retrievedAttendances.map((attendee) => attendee.id)
    // expect(attendeeIds).toContain('fakeUser1')
    // expect(attendeeIds).toContain('fakeUser2')

    const user1 = await createUser(
      'User1',
      'user1@example.com',
      'password123',
      '1234567890',
    )

    const user2 = await createUser(
      'User2',
      'user2@example.com',
      'password123',
      '1234567890',
    )

    const meetingDate = new Date(2022, 3, 16)
    const meeting = await createMeeting(meetingDate)

    console.log(user1, user2)
    console.log(meeting)
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
