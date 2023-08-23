import { inject, injectable } from 'tsyringe'

import { IUseCase } from '@shared/core/domain/IUseCase'
import { MeetingAttendance } from '@modules/meeting/domain/MeetingAttendance'

import { IMeetingsAttendancesRepository } from '@modules/meeting/repositories/IMeetingsAttendancesRepository'

interface IRequest {
  date: Date
}

interface IResponse {
  meetingsAttendances: MeetingAttendance[]
}

@injectable()
class ListMeetingsByDate implements IUseCase<IRequest, IResponse> {
  constructor(
    @inject('MeetingsAttendancesRepository')
    private meetingsAttendances: IMeetingsAttendancesRepository,
  ) {}

  async execute({ date }: IRequest): Promise<IResponse> {
    const meetingsAttendances = await this.meetingsAttendances.listByDate(date)

    return { meetingsAttendances }
  }
}

export { ListMeetingsByDate }
