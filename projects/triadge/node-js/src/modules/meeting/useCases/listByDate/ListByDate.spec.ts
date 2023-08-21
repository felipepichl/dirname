import { User } from '@modules/accounts/domain/User'
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'
import { Attendance } from '@modules/attendance/domain/Attendance'
import { AttendanceRepositoryInMemory } from '@modules/attendance/repositories/in-memory/AttendanceRepositoryInMemory'
import { MeetingAttendance } from '@modules/meeting/domain/MeetingAttendance'
import { MeetingsAttendancesRepositoryInMemory } from '@modules/meeting/repositories/in-memory/MeetingsAttendancesRepositoryInMemory'

import { ListByDate } from './ListByDate'

let usersRepositoryInMemory: UsersRepositoryInMemory
let attendanceRepositoryInMemory: AttendanceRepositoryInMemory
let meetingsAttendancesRepositoryInMemory: MeetingsAttendancesRepositoryInMemory

let listByDate: ListByDate

describe('[Meeting] - List Meeting Attendance by Date', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    attendanceRepositoryInMemory = new AttendanceRepositoryInMemory()
    meetingsAttendancesRepositoryInMemory =
      new MeetingsAttendancesRepositoryInMemory()

    listByDate = new ListByDate(meetingsAttendancesRepositoryInMemory)
  })

  it('should be able to list all meeting by date', async () => {
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

    const user3 = User.createUser({
      name: 'Test User3',
      email: 'user3@test.com',
      password: '123456',
      phoneNumber: '12345678910',
    })

    await usersRepositoryInMemory.create(user1)
    await usersRepositoryInMemory.create(user2)
    await usersRepositoryInMemory.create(user3)

    const attendanceDate = new Date(2022, 3, 16)
    const attendance = Attendance.createAttendance({
      date: attendanceDate,
    })

    await attendanceRepositoryInMemory.create(attendance)

    const { id: userId1 } =
      await usersRepositoryInMemory.findByEmail('user1@test.com')
    const { id: userId2 } =
      await usersRepositoryInMemory.findByEmail('user2@test.com')

    const { id: attendanceId } =
      await attendanceRepositoryInMemory.findByDate(attendanceDate)

    const userIds = [userId1.toString(), userId2.toString()]

    const meetingsAttendances = MeetingAttendance.createMeetingAttendance({
      userIds,
      attendanceId: attendanceId.toString(),
      attendance,
    })

    await meetingsAttendancesRepositoryInMemory.create(meetingsAttendances)

    const meetingsForGivenDate = await listByDate.execute({
      date: attendanceDate,
    })

    expect(meetingsForGivenDate.mettingsAttendances).toHaveLength(1)
    expect(meetingsForGivenDate.mettingsAttendances[0].userIds).toEqual(
      expect.arrayContaining([userId1.toString(), userId2.toString()]),
    )
    expect(meetingsForGivenDate.mettingsAttendances[0].userIds).not.toContain(
      user3.id,
    )
  })
})
