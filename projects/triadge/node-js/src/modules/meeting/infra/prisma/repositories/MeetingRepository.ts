import { Meeting } from '@modules/meeting/domain/Meeting'
import { IMeetingRepository } from '@modules/meeting/repositories/IMeetingRepository'

import { PrismaSingleton } from '@shared/infra/prisma'

import { MeetingMappers } from '../mappers/MeetingMappers'

class MeetingRepository implements IMeetingRepository {
  async create({ date }: Meeting): Promise<void> {
    await PrismaSingleton.getInstance().meeting.create({
      data: {
        date,
      },
    })
  }

  async findById(id: string): Promise<Meeting> {
    const result = await PrismaSingleton.getInstance().meeting.findFirst({
      where: { id },
    })

    return MeetingMappers.getMapper().toDomain(result)
  }

  async findAll(): Promise<Meeting[]> {
    const result = await PrismaSingleton.getInstance().meeting.findMany()

    return MeetingMappers.getMapper().toDomainArray(result)
  }

  async findWithAttendeesByDate(date: Date): Promise<Meeting[]> {
    const result = await PrismaSingleton.getInstance().meeting.findMany({
      where: {
        date,
      },
      include: {
        attendances: {
          include: {
            user: true,
          },
        },
      },
    })

    return MeetingMappers.getMapper().toDomainArray(result)
  }

  async findByDateWithAttendees(date: Date): Promise<Meeting> {
    const result = await PrismaSingleton.getInstance().meeting.findFirst({
      where: {
        date,
      },
      include: {
        attendances: {
          select: {
            user: true,
          },
        },
      },
    })

    return MeetingMappers.getMapper().toDomain(result)
  }

  async findByDate(date: Date): Promise<Meeting> {
    const result = await PrismaSingleton.getInstance().meeting.findFirst({
      where: { date },
    })

    return MeetingMappers.getMapper().toDomain(result)
  }

  async findWithinDateRange(
    startDate: Date,
    endDate: Date,
  ): Promise<Meeting[]> {
    const result = await PrismaSingleton.getInstance().meeting.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    })

    return MeetingMappers.getMapper().toDomainArray(result)
  }
}

export { MeetingRepository }
