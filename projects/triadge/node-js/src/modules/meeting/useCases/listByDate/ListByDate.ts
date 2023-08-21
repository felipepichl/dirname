import { IUseCase } from '@shared/core/domain/IUseCase'
import { MeetingAttendance } from '@modules/meeting/domain/MeetingAttendance'

import { IMeetingsAttendancesRepository } from '@modules/meeting/repositories/IMeetingsAttendancesRepository'

interface IRequest {
  date: Date
}

interface IResponse {
  mettingsAttendances: MeetingAttendance[]
}

class ListByDate implements IUseCase<IRequest, IResponse> {
  constructor(private meetingsAttendances: IMeetingsAttendancesRepository) {}

  async execute({ date }: IRequest): Promise<IResponse> {
    const mettingsAttendances = await this.meetingsAttendances.listByDate(date)

    return { mettingsAttendances }
  }
}

export { ListByDate }
