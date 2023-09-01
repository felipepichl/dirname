import { IUseCase } from '@shared/core/domain/IUseCase'
import { User } from '@modules/accounts/domain/User'
import { Meeting } from '@modules/meeting/domain/Meeting'
import { IMeetingRepository } from '@modules/meeting/repositories/IMeetingRepository'

interface IRequest {
  date: Date
}

interface IResponse {
  meetings: Meeting
  attendees: User[]
}

class FindMeetingByDate implements IUseCase<IRequest, IResponse> {
  constructor(private meetingsRepository: IMeetingRepository) {}

  execute({ date }: IRequest): Promise<IResponse> {}
}

export { FindMeetingByDate }
