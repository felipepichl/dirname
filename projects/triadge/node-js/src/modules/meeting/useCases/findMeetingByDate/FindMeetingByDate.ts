import { inject, injectable } from 'tsyringe'

import { IUseCase } from '@shared/core/domain/IUseCase'
import { User } from '@modules/accounts/domain/User'

import { IMeetingRepository } from '@modules/meeting/repositories/IMeetingRepository'
import { AppError } from '@shared/error/AppError'

interface IRequest {
  date: Date
}

interface IResponse {
  meeting: {
    date: Date
    attendees: User[]
  }
}

@injectable()
class FindMeetingByDate implements IUseCase<IRequest, IResponse> {
  constructor(
    @inject('MeetingsRepository')
    private meetingsRepository: IMeetingRepository,
  ) {}

  async execute({ date }: IRequest): Promise<IResponse> {
    const meeting = await this.meetingsRepository.findByDateWithAttendees(date)

    if (!meeting) {
      throw new AppError('Meeting not found', 404)
    }

    let attendees: User[] = []

    if (meeting.attendances && meeting.attendances.length > 0) {
      attendees = meeting.attendances.flatMap((attendance) => attendance.user)
    }

    console.log(meeting)

    return {
      meeting: {
        date: meeting.date,
        attendees,
      },
    }
  }
}

export { FindMeetingByDate }
