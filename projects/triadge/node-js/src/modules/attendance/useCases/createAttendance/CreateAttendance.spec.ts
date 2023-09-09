import { User } from '@modules/accounts/domain/User'
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'
import { Meeting } from '@modules/meeting/domain/Meeting'
import { MeetingRepositoryInMemory } from '@modules/meeting/repositories/in-memory/MeetingRepositoryInMemory'
import { AttendancesRepositoryInMemory } from '@modules/attendance/repositories/in-memory/AttendancesRepositoryInMemory'

import { CreateAttendance } from '@modules/attendance/useCases/createAttendance/CreateAttendance'

import { AppError } from '@shared/error/AppError'

let usersRepositoryInMemory: UsersRepositoryInMemory
let meetingRepositoryInMemory: MeetingRepositoryInMemory
let attendancesRepositoryInMemory: AttendancesRepositoryInMemory

let createAttendance: CreateAttendance

describe('[Attendance] - Create Attendance', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    meetingRepositoryInMemory = new MeetingRepositoryInMemory()
    attendancesRepositoryInMemory = new AttendancesRepositoryInMemory()

    createAttendance = new CreateAttendance(
      usersRepositoryInMemory,
      meetingRepositoryInMemory,
      attendancesRepositoryInMemory,
    )
  })

  it('should create a new attendance', async () => {
    const user1 = User.createUser({
      name: 'Test User1',
      email: 'user1@test.com',
      password: '123456',
      phoneNumber: '123456789',
    })

    const user2 = User.createUser({
      name: 'Test User2',
      email: 'user2@test.com',
      password: '123456',
      phoneNumber: '123456789',
    })

    await usersRepositoryInMemory.create(user1)
    await usersRepositoryInMemory.create(user2)

    const meetingDate = new Date()
    const meeting = Meeting.createMeeting({
      date: meetingDate,
    })

    await meetingRepositoryInMemory.create(meeting)

    const { id: userId1 } = user1
    const { id: userId2 } = user2

    const { id: meetingId } = meeting

    const userIds = [userId1.toString(), userId2.toString()]

    await createAttendance.execute({
      userIds,
      meetingId: meetingId.toString(),
    })

    const attendanceRecords =
      await attendancesRepositoryInMemory.findByUserIdsAndMeetingId(
        userIds,
        meeting.id.toString(),
      )

    expect(attendanceRecords).toHaveLength(1)

    const storedUserIds = attendanceRecords.flatMap((ua) => ua.userIds)
    expect(storedUserIds).toContain(userId1.toString())
    expect(storedUserIds).toContain(userId2.toString())

    attendanceRecords.forEach((record) => {
      expect(record.meetingId).toBe(meetingId.toString())
    })
  })

  it('should reject creating attendance for a non-existent user', async () => {
    const meetingDate = new Date()
    const meeting = Meeting.createMeeting({
      date: meetingDate,
    })
    await meetingRepositoryInMemory.create(meeting)
    const { id } = await meetingRepositoryInMemory.findByDate(meetingDate)
    await expect(
      createAttendance.execute({
        userIds: [''],
        meetingId: id.toString(),
      }),
    ).rejects.toEqual(new AppError(`Users with IDs ${''} not found`, 404))
  })

  it('should reject creating attendance for a non-existent meeting', async () => {
    const user = User.createUser({
      name: 'Test User',
      email: 'user@test.com',
      password: '123456',
      phoneNumber: '123456789',
    })

    await usersRepositoryInMemory.create(user)

    const { id: userId } =
      await usersRepositoryInMemory.findByEmail('user@test.com')

    const userIds = [userId.toString()]

    await expect(
      createAttendance.execute({
        userIds,
        meetingId: 'non-existent-meeting_id',
      }),
    ).rejects.toEqual(new AppError('Meeting not found', 404))
  })

  it('should prevent duplicate attendance creation', async () => {
    const user = User.createUser({
      name: 'Test User1',
      email: 'user1@test.com',
      password: '123456',
      phoneNumber: '123456789',
    })

    await usersRepositoryInMemory.create(user)

    const meetingDate = new Date()

    const meeting = Meeting.createMeeting({
      date: meetingDate,
    })

    await meetingRepositoryInMemory.create(meeting)

    const { id: userId1 } =
      await usersRepositoryInMemory.findByEmail('user1@test.com')

    const { id: meetingId } =
      await meetingRepositoryInMemory.findByDate(meetingDate)

    const userIds = [userId1.toString()]

    await createAttendance.execute({
      userIds,
      meetingId: meetingId.toString(),
    })

    await expect(
      createAttendance.execute({
        userIds,
        meetingId: meetingId.toString(),
      }),
    ).rejects.toEqual(
      new AppError(
        `MeetingAttendance for user IDs ${userIds[0]} and meeting ID ${meetingId} already exists`,
        409,
      ),
    )
  })
})
