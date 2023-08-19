import { Attendance } from '@modules/attendance/domain/Attendance'
import { AttendanceRepositoryInMemory } from '@modules/attendance/repositories/in-memory/AttendanceRepositoryInMemory'

import { CreateAttendanceUseCase } from './CreateAttendanceUseCase'

let attendancesRepositryInMemory: AttendanceRepositoryInMemory
let createAttendanceUseCase: CreateAttendanceUseCase

describe('[Attendance] - Create an Attendance', () => {
  beforeEach(() => {
    attendancesRepositryInMemory = new AttendanceRepositoryInMemory()

    createAttendanceUseCase = new CreateAttendanceUseCase(
      attendancesRepositryInMemory,
    )
  })

  it('should be able to create a new attendance', async () => {
    const attendance = Attendance.createAttendance({
      date: new Date(),
    })

    await createAttendanceUseCase.execute(attendance)

    const attendanceCreated = await attendancesRepositryInMemory.listAll()

    expect(attendanceCreated.length).toBeGreaterThan(0)
    expect(attendanceCreated[0].date).toEqual(attendance.date)
  })
})
