import { AttendanceRepositoryInMemory } from '@modules/attendance/repositories/in-memory/AttendanceRepositoryInMemory'

import { CreateAttendanceUseCase } from '../createAttendance/CreateAttendanceUseCase'
import { ListAllAttendancesUseCase } from './ListAllAttendancesUseCase'

describe('[Attendance] - List All Attendances', () => {
  let createAttendanceUseCase: CreateAttendanceUseCase
  let listAllAttendancesUseCase: ListAllAttendancesUseCase
  let attendanceRepositoryInMemory: AttendanceRepositoryInMemory

  beforeEach(() => {
    attendanceRepositoryInMemory = new AttendanceRepositoryInMemory()
    createAttendanceUseCase = new CreateAttendanceUseCase(
      attendanceRepositoryInMemory,
    )
    listAllAttendancesUseCase = new ListAllAttendancesUseCase(
      attendanceRepositoryInMemory,
    )
  })

  it('should be able to list all attendances with their users', async () => {
    const date1 = new Date()
    const date2 = new Date()

    await createAttendanceUseCase.execute({
      date: date1,
    })
    await createAttendanceUseCase.execute({
      date: date2,
    })

    const result = await listAllAttendancesUseCase.execute()

    expect(result).toHaveLength(2)
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          date: date1,
        }),
        expect.objectContaining({
          date: date2,
        }),
      ]),
    )
  })
})
