import { IUseCase } from '@shared/core/domain/IUseCase'
import { MeetingAttendance } from '@modules/meeting/domain/MeetingAttendance'

import { IMeetingsAttendancesRepository } from '@modules/meeting/repositories/IMeetingsAttendancesRepository'

interface IRequest {
  date: Date
}

interface IResponse {
  meetingsAttendances: MeetingAttendance[]
}

class ListMeetingsByDate implements IUseCase<IRequest, IResponse> {
  constructor(private meetingsAttendances: IMeetingsAttendancesRepository) {}

  async execute({ date }: IRequest): Promise<IResponse> {
    const meetingsAttendances = await this.meetingsAttendances.listByDate(date)

    return { meetingsAttendances }
  }
}

export { ListMeetingsByDate }
