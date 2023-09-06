import { Meeting } from '@modules/meeting/domain/Meeting'

import { IMeetingRepository } from '../IMeetingRepository'

class MeetingRepositoryInMemory implements IMeetingRepository {
  private meetings: Meeting[] = []

  clear(): void {
    this.meetings = []
  }

  async create(meeting: Meeting): Promise<void> {
    this.meetings.push(meeting)
  }

  async findById(id: string): Promise<Meeting> {
    return this.meetings.find((meeting) => meeting.id.toString() === id)
  }

  async findAll(): Promise<Meeting[]> {
    return this.meetings
  }

  async findWithAttendeesByDate(date: Date): Promise<Meeting[]> {
    return this.meetings.filter((meeting) => meeting.date === date)
  }

  async findByDateWithAttendees(date: Date): Promise<Meeting> {
    return this.meetings.find((meeting) => meeting.date === date)
  }

  async findByDate(date: Date): Promise<Meeting> {
    return this.meetings.find((meeting) => meeting.date === date)
  }

  async findWithinDateRange(
    startDate: Date,
    endDate: Date,
  ): Promise<Meeting[]> {
    return this.meetings.filter(
      (meeting) => meeting.date >= startDate && meeting.date <= endDate,
    )
  }
}

export { MeetingRepositoryInMemory }
