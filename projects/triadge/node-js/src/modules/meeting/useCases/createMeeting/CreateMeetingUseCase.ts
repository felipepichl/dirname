import { inject, injectable } from 'tsyringe'

import { IUseCase } from '@shared/core/domain/IUseCase'
import { IMeetingRepository } from '@modules/meeting/repositories/IMeetingRepository'
import { Meeting } from '@modules/meeting/domain/Meeting'

interface IRequest {
  date: Date
}

@injectable()
class CreateMeetingUseCase implements IUseCase<IRequest, void> {
  constructor(
    @inject('MeetingsRepository')
    private meetingsRepository: IMeetingRepository,
  ) {}

  async execute({ date }: IRequest): Promise<void> {
    const meeting = Meeting.createMeeting({
      date,
    })

    await this.meetingsRepository.create(meeting)
  }
}

export { CreateMeetingUseCase }
