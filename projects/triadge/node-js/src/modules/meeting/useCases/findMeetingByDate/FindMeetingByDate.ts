import { IUseCase } from '@shared/core/domain/IUseCase'
import { User } from '@modules/accounts/domain/User'
import { Meeting } from '@modules/meeting/domain/Meeting'
import { IMeetingRepository } from '@modules/meeting/repositories/IMeetingRepository'
import { AppError } from '@shared/error/AppError'

interface IRequest {
  date: Date
}

interface IResponse {
  meeting: Meeting
  attendees: User[]
}

class FindMeetingByDate implements IUseCase<IRequest, IResponse> {
  constructor(private meetingsRepository: IMeetingRepository) {}

  async execute({ date }: IRequest): Promise<IResponse> {
    const meeting = await this.meetingsRepository.findByDateWithAttendees(date)

    if (!meeting) {
      throw new AppError('Meeting not found', 404)
    }

    const attendees = meeting.attendances.flatMap(
      (attendance) => attendance.user,
    )

    return { meeting, attendees }
  }
}

export { FindMeetingByDate }
