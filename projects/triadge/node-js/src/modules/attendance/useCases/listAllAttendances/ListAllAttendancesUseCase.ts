import { Attendance } from '@modules/attendance/domain/Attendance'
import { IAttendanceRepository } from '@modules/attendance/repositories/IAttendanceRepository'
import { inject, injectable } from 'tsyringe'

import { IUseCase } from '@shared/core/domain/IUseCase'

type IResponse = Attendance[]

@injectable()
class ListAllAttendancesUseCase implements IUseCase<void, IResponse> {
  constructor(
    @inject('AttendanceRepository')
    private attendancesRepository: IAttendanceRepository,
  ) {}

  async execute(): Promise<IResponse> {
    const result = await this.attendancesRepository.listAll()

    return result
  }
}

export { ListAllAttendancesUseCase }
