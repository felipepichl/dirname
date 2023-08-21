import { User } from '@modules/accounts/domain/User'
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'
import { Attendance } from '@modules/attendance/domain/Attendance'
import { AttendanceRepositoryInMemory } from '@modules/attendance/repositories/in-memory/AttendanceRepositoryInMemory'
import { MeetingAttendance } from '@modules/meeting/domain/MeetingAttendance'
import { MeetingsAttendancesRepositoryInMemory } from '@modules/meeting/repositories/in-memory/MeetingsAttendancesRepositoryInMemory'

let usersRepositoryInMemory: UsersRepositoryInMemory
let attendanceRepositoryInMemory: AttendanceRepositoryInMemory
let meetingsAttendancesRepositoryInMemory: MeetingsAttendancesRepositoryInMemory

describe('[Meeting] - List Meeting Attendance by Date', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    attendanceRepositoryInMemory = new AttendanceRepositoryInMemory()
    meetingsAttendancesRepositoryInMemory =
      new MeetingsAttendancesRepositoryInMemory()
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

    await usersRepositoryInMemory.create(user1)
    await usersRepositoryInMemory.create(user2)

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

    const mettingsAttendances = MeetingAttendance.createMeetingAttendance({
      userIds,
      attendanceId: attendanceId.toString(),
    })

    meetingsAttendancesRepositoryInMemory.create(mettingsAttendances)
  })
})
