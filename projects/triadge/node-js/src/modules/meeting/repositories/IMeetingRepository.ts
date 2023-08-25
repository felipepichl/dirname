import { Meeting } from '../domain/Meeting'

interface IMeetingRepository {
  create(attenance: Meeting): Promise<void>
  findById(id: string): Promise<Meeting | null>
  findAll(): Promise<Meeting[]>
  findWithAttendees(date: Date): Promise<Meeting[]>
  findWithinDateRange(startDate: Date, endDate: Date): Promise<Meeting[]>
}

export { IMeetingRepository }
