import { inject, injectable } from 'tsyringe'

import { IUseCase } from '@shared/core/domain/IUseCase'

import { Meeting } from '@modules/meeting/domain/Meeting'
import { IMeetingRepository } from '@modules/meeting/repositories/IMeetingRepository'

interface IResponse {
  meetings: Meeting[]
}

@injectable()
class ListAllMeeting implements IUseCase<void, IResponse> {
  constructor(
    @inject('MeetingsRepository')
    private meetingsRepository: IMeetingRepository,
  ) {}

  async execute(): Promise<IResponse> {
    const meetings = await this.meetingsRepository.findAll()

    return {
      meetings,
    }
  }
}

export { ListAllMeeting }
