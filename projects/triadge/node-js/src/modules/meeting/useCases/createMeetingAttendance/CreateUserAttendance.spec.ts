import { User } from '@modules/accounts/domain/User'
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'
import { Attendance } from '@modules/attendance/domain/Attendance'
import { AttendanceRepositoryInMemory } from '@modules/attendance/repositories/in-memory/AttendanceRepositoryInMemory'
import { MeetingsAttendancesRepositoryInMemory } from '@modules/meeting/repositories/in-memory/MeetingsAttendancesRepositoryInMemory'
import { CreateMeetingAttendance } from '@modules/meeting/useCases/createMeetingAttendance/CreateMeetingAttendance'

import { AppError } from '@shared/error/AppError'

let createMeetingAttendance: CreateMeetingAttendance
let meetingsAttendancesRepositoryInMemory: MeetingsAttendancesRepositoryInMemory
let usersRepositoryInMemory: UsersRepositoryInMemory
let attendanceRepositoryInMemory: AttendanceRepositoryInMemory

describe('[Meeting] - Create User Attendance', () => {
  beforeEach(() => {
    meetingsAttendancesRepositoryInMemory =
      new MeetingsAttendancesRepositoryInMemory()
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    attendanceRepositoryInMemory = new AttendanceRepositoryInMemory()
    createMeetingAttendance = new CreateMeetingAttendance(
      usersRepositoryInMemory,
      attendanceRepositoryInMemory,
      meetingsAttendancesRepositoryInMemory,
    )
  })

  it('should create a new UserAttendance', async () => {
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

    const attendanceDate = new Date()
    const attendance = Attendance.createAttendance({
      date: attendanceDate,
    })

    await attendanceRepositoryInMemory.create(attendance)

    const { id: user_id_1 } =
      await usersRepositoryInMemory.findByEmail('user1@test.com')
    const { id: user_id_2 } =
      await usersRepositoryInMemory.findByEmail('user2@test.com')

    const { id: attendance_id } =
      await attendanceRepositoryInMemory.findByDate(attendanceDate)

    const user_ids = [user_id_1.toString(), user_id_2.toString()]

    await createMeetingAttendance.execute({
      user_ids,
      attendance_id: attendance_id.toString(),
    })

    await meetingsAttendancesRepositoryInMemory.findByUserIdsAndAttendanceId(
      user_ids,
      attendance_id.toString(),
    )

    const userAttendanceRecords =
      await meetingsAttendancesRepositoryInMemory.findByUserIdsAndAttendanceId(
        user_ids,
        attendance_id.toString(),
      )

    expect(userAttendanceRecords).toHaveLength(1)

    const storedUserIds = userAttendanceRecords.flatMap((ua) => ua.user_ids)
    expect(storedUserIds).toContain(user_id_1.toString())
    expect(storedUserIds).toContain(user_id_2.toString())

    userAttendanceRecords.forEach((record) => {
      expect(record.attendance_id).toBe(attendance_id.toString())
    })
  })

  it('should reject creating UserAttendance for a non-existent user', async () => {
    const attendanceDate = new Date()
    const attendance = Attendance.createAttendance({
      date: attendanceDate,
    })

    await attendanceRepositoryInMemory.create(attendance)

    const { id } = await attendanceRepositoryInMemory.findByDate(attendanceDate)

    await expect(
      createMeetingAttendance.execute({
        user_ids: [''],
        attendance_id: id.toString(),
      }),
    ).rejects.toEqual(new AppError(`Users with IDs ${''} not found`, 404))
  })

  it('should reject creating UserAttendance for a non-existent attendance', async () => {
    const user = User.createUser({
      name: 'Test User',
      email: 'user@test.com',
      password: '123456',
      phoneNumber: '123456789',
    })

    await usersRepositoryInMemory.create(user)

    const attendanceDate = new Date()
    const attendance = Attendance.createAttendance({
      date: attendanceDate,
    })

    await attendanceRepositoryInMemory.create(attendance)

    const { id: user_id } =
      await usersRepositoryInMemory.findByEmail('user@test.com')

    const user_ids = [user_id.toString()]

    await expect(
      createMeetingAttendance.execute({
        user_ids,
        attendance_id: 'non-existent-attendance_id',
      }),
    ).rejects.toEqual(new AppError('Attendance not found', 404))
  })

  it('should prevent duplicate UserAttendance creation', async () => {
    const user = User.createUser({
      name: 'Test User1',
      email: 'user1@test.com',
      password: '123456',
      phoneNumber: '123456789',
    })

    await usersRepositoryInMemory.create(user)

    const attendanceDate = new Date()

    const attendance = Attendance.createAttendance({
      date: attendanceDate,
    })

    await attendanceRepositoryInMemory.create(attendance)

    const { id: user_id_1 } =
      await usersRepositoryInMemory.findByEmail('user1@test.com')

    const { id: attendance_id } =
      await attendanceRepositoryInMemory.findByDate(attendanceDate)

    const user_ids = [user_id_1.toString()]

    await createMeetingAttendance.execute({
      user_ids,
      attendance_id: attendance_id.toString(),
    })

    await expect(
      createMeetingAttendance.execute({
        user_ids,
        attendance_id: attendance_id.toString(),
      }),
    ).rejects.toEqual(
      new AppError(
        `MeetingAttendance for user ID ${user_ids[0]} and attendance ID ${attendance_id} already exists`,
        409,
      ),
    )
  })
})
