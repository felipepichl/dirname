import { User } from '@modules/accounts/domain/User'
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'
import { MeetingRepositoryInMemory } from '@modules/meeting/repositories/in-memory/MeetingRepositoryInMemory'
import { Attendance } from '@modules/attendance/domain/Attendance'
import { AttendancesRepositoryInMemory } from '@modules/attendance/repositories/in-memory/AttendancesRepositoryInMemory'

import { CreateAttendance } from '@modules/attendance/useCases/createAttendance/CreateAttendance'

import { AppError } from '@shared/error/AppError'
import { Meeting } from '@modules/meeting/domain/Meeting'

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

  it('should create a new Attendance', async () => {
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

    const { id: userId1 } =
      await usersRepositoryInMemory.findByEmail('user1@test.com')
    const { id: userId2 } =
      await usersRepositoryInMemory.findByEmail('user2@test.com')

    // const { id: mettingId } =
    //   await meetingRepositoryInMemory.findByDate(meetingDate)

    // const userIds = [userId1.toString(), userId2.toString()]

    // await createAttendance.execute({
    //   userIds,
    //   meetingId: mettingId.toString(),
    // })

    // await meetingsAttendancesRepositoryInMemory.findByUserIdsAndAttendanceId(
    //   userIds,
    //   attendanceId.toString(),
    // )

    // const userAttendanceRecords =
    //   await meetingsAttendancesRepositoryInMemory.findByUserIdsAndAttendanceId(
    //     userIds,
    //     attendanceId.toString(),
    //   )

    // expect(userAttendanceRecords).toHaveLength(1)

    // const storedUserIds = userAttendanceRecords.flatMap((ua) => ua.userIds)
    // expect(storedUserIds).toContain(userId1.toString())
    // expect(storedUserIds).toContain(userId2.toString())

    // userAttendanceRecords.forEach((record) => {
    //   expect(record.attendanceId).toBe(attendanceId.toString())
    // })
  })

  it('should reject creating UserAttendance for a non-existent user', async () => {
    // const attendanceDate = new Date()
    // const attendance = Attendance.createAttendance({
    //   date: attendanceDate,
    // })
    // await attendanceRepositoryInMemory.create(attendance)
    // const { id } = await attendanceRepositoryInMemory.findByDate(attendanceDate)
    // await expect(
    //   createMeetingAttendance.execute({
    //     userIds: [''],
    //     attendanceId: id.toString(),
    //   }),
    // ).rejects.toEqual(new AppError(`Users with IDs ${''} not found`, 404))
  })

  it('should reject creating UserAttendance for a non-existent attendance', async () => {
    const user = User.createUser({
      name: 'Test User',
      email: 'user@test.com',
      password: '123456',
      phoneNumber: '123456789',
    })

    await usersRepositoryInMemory.create(user)

    // const attendanceDate = new Date()
    // const attendance = Attendance.createAttendance({
    //   date: attendanceDate,
    // })

    // await attendanceRepositoryInMemory.create(attendance)

    // const { id: userId } =
    //   await usersRepositoryInMemory.findByEmail('user@test.com')

    // const userIds = [userId.toString()]

    // await expect(
    //   createMeetingAttendance.execute({
    //     userIds,
    //     attendanceId: 'non-existent-attendance_id',
    //   }),
    // ).rejects.toEqual(new AppError('Attendance not found', 404))
  })

  it('should prevent duplicate UserAttendance creation', async () => {
    const user = User.createUser({
      name: 'Test User1',
      email: 'user1@test.com',
      password: '123456',
      phoneNumber: '123456789',
    })

    await usersRepositoryInMemory.create(user)

    // const attendanceDate = new Date()

    // const attendance = Attendance.createAttendance({
    //   date: attendanceDate,
    // })

    // await attendanceRepositoryInMemory.create(attendance)

    // const { id: userId1 } =
    //   await usersRepositoryInMemory.findByEmail('user1@test.com')

    // const { id: attendanceId } =
    //   await attendanceRepositoryInMemory.findByDate(attendanceDate)

    // const userIds = [userId1.toString()]

    // await createMeetingAttendance.execute({
    //   userIds,
    //   attendanceId: attendanceId.toString(),
    // })

    // await expect(
    //   createMeetingAttendance.execute({
    //     userIds,
    //     attendanceId: attendanceId.toString(),
    //   }),
    // ).rejects.toEqual(
    //   new AppError(
    //     `MeetingAttendance for user ID ${userIds[0]} and attendance ID ${attendanceId} already exists`,
    //     409,
    //   ),
    // )
  })
})
