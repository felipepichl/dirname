import { User } from '@modules/accounts/domain/User'
import { Meeting } from '@modules/meeting/domain/Meeting'
import { Attendance } from '@modules/attendance/domain/Attendance'

import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'
import { MeetingRepositoryInMemory } from '@modules/meeting/repositories/in-memory/MeetingRepositoryInMemory'
import { AttendancesRepositoryInMemory } from '@modules/attendance/repositories/in-memory/AttendancesRepositoryInMemory'

import { FindMeetingByDate } from './FindMeetingByDate'

import { AppError } from '@shared/error/AppError'

let meetingsRepositoryInMemory: MeetingRepositoryInMemory
let attendancesRepository: AttendancesRepositoryInMemory
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

  return user
}

async function createMeeting(date: Date): Promise<Meeting> {
  const meeting = Meeting.createMeeting({ date })
  await meetingsRepositoryInMemory.create(meeting)

  return meeting
}

async function createAttendanceForUsers(users: User[], meeting: Meeting) {
  const userIds = users.map((user) => user.id.toString())
  const meetingId = meeting.id.toString()

  const attendance = Attendance.createAttendance({
    userIds,
    meetingId,
    user: users,
    meeting,
  })

  await attendancesRepository.create(attendance)

  const originalMeeting = await meetingsRepositoryInMemory.findByDate(
    meeting.date,
  )

  const clonedMeeting = Object.assign(
    Object.create(Object.getPrototypeOf(originalMeeting)),
    originalMeeting,
  )

  clonedMeeting.props = { ...clonedMeeting.props, attendances: [attendance] }

  meetingsRepositoryInMemory.clear()

  await meetingsRepositoryInMemory.create(clonedMeeting)
}

describe('[Meeting] - Find meeting by date', () => {
  let user1: User
  let user2: User
  let meeting: Meeting

  beforeAll(async () => {
    meetingsRepositoryInMemory = new MeetingRepositoryInMemory()
    attendancesRepository = new AttendancesRepositoryInMemory()

    findMeetingByDate = new FindMeetingByDate(meetingsRepositoryInMemory)

    user1 = await createUser(
      'User1',
      'user1@example.com',
      'password123',
      '1234567890',
    )
    user2 = await createUser(
      'User2',
      'user2@example.com',
      'password123',
      '1234567890',
    )

    meetingDate = new Date(2022, 3, 16)
    meeting = await createMeeting(meetingDate)

    await createAttendanceForUsers([user1, user2], meeting)
  })

  it('should return a meeting and its attendees when found by date', async () => {
    const response = await findMeetingByDate.execute({
      date: meetingDate,
    })

    expect(response.meeting.date).toEqual(meetingDate)
    const retrievedAttendances = response.meeting.attendees
    expect(retrievedAttendances).toHaveLength(2)
    expect(response.meeting).toBeDefined()
    expect(response.meeting.attendees).toBeDefined()
    const [attendeeId1, attendeeId2] = retrievedAttendances.map((attendee) =>
      attendee.id.toString(),
    )
    expect(attendeeId1).toContain(user1.id.toString())
    expect(attendeeId2).toContain(user2.id.toString())
  })

  it('should throw an AppError if no meeting is found for the specified date', async () => {
    await expect(
      findMeetingByDate.execute({
        date: new Date(2022, 3, 16),
      }),
    ).rejects.toEqual(new AppError('Meeting not found', 404))
  })
})
