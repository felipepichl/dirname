import { User } from '@modules/accounts/domain/User'
import { Meeting } from '@modules/meeting/domain/Meeting'
import { Attendance } from '@modules/attendance/domain/Attendance'

import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'
import { MeetingRepositoryInMemory } from '@modules/meeting/repositories/in-memory/MeetingRepositoryInMemory'
import { AttendancesRepositoryInMemory } from '@modules/attendance/repositories/in-memory/AttendancesRepositoryInMemory'

import { FindMeetingByDate } from './FindMeetingByDate'

import { AppError } from '@shared/error/AppError'

let meetingsRepositoryInMemory: MeetingRepositoryInMemory
let findMeetingByDate: FindMeetingByDate
let meetingDate: Date

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

async function _createMeeting(
  date: Date,
  attendances?: Attendance[],
): Promise<Meeting> {
  const meeting = Meeting.createMeeting({ date })
  await meetingsRepositoryInMemory.create(meeting)

  const originalMeeting = await meetingsRepositoryInMemory.findAll()

  const clonedMeeting = Object.assign(
    Object.create(Object.getPrototypeOf(originalMeeting[0])),
    originalMeeting[0],
  )

  if (attendances && attendances.length > 0) {
    clonedMeeting.props = { ...clonedMeeting.props, attendances }
  }

  return clonedMeeting
}

async function createMeeting(date: Date): Promise<Meeting> {
  meetingsRepositoryInMemory = new MeetingRepositoryInMemory()

  const meeting = Meeting.createMeeting({ date })
  await meetingsRepositoryInMemory.create(meeting)

  const allMeetings = await meetingsRepositoryInMemory.findAll()
  return allMeetings[0]
}

async function createAttendance(
  users: User[],
  meeting: Meeting,
): Promise<Attendance> {
  const userIds = [users[0].id.toString(), users[1].id.toString()]
  const meetingId = meeting.id.toString()

  const attendance = Attendance.createAttendance({
    userIds,
    meetingId,
    user: [users[0], users[1]],
    meeting,
  })

  const attendancesRepository = new AttendancesRepositoryInMemory()
  await attendancesRepository.create(attendance)

  const originalMeeting = await meetingsRepositoryInMemory.findByDate(
    meeting.date,
  )

  const clonedMeeting = Object.assign(
    Object.create(Object.getPrototypeOf(originalMeeting)),
    originalMeeting,
  )

  clonedMeeting.props = { ...clonedMeeting.props, attendances: [attendance] }

  meetingsRepositoryInMemory = new MeetingRepositoryInMemory()

  await meetingsRepositoryInMemory.create(clonedMeeting)
  findMeetingByDate = new FindMeetingByDate(meetingsRepositoryInMemory)

  const result = await attendancesRepository.findAll()
  return result[0]
}

describe('[Meeting] - Find meeting by date', () => {
  beforeAll(async () => {
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

    meetingDate = new Date(2022, 3, 16)
    const meeting = await createMeeting(meetingDate)

    await createAttendance([user1, user2], meeting)
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

    const result = await findMeetingByDate.execute({
      date: meetingDate,
    })

    console.log(result)
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
