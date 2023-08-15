import { MeetingAttendance } from '@modules/meeting/domain/MeetingAttendance';

import { IMeetingAttendanceRepository } from '../IMeetingAttendanceRepository';

class IMeetingAttendanceRepositoryInMemory
  implements IMeetingAttendanceRepository
{
  private meetingsAttendances: MeetingAttendance[] = [];

  async create(meetingAttendance: MeetingAttendance): Promise<void> {
    this.meetingsAttendances.push(meetingAttendance);
  }
  async findAllByUserId(user_id: string): Promise<MeetingAttendance[]> {
    return this.meetingsAttendances.filter(object =>
      object.user_ids.includes(user_id),
    );
  }
  async findAllByAttendanceId(
    attendance_id: string,
  ): Promise<MeetingAttendance[]> {
    return this.meetingsAttendances.filter(
      object => object.attendance_id === attendance_id,
    );
  }
  async findByUserIdAndAttendanceId(
    user_id: string,
    attendance_id: string,
  ): Promise<MeetingAttendance> {
    return this.meetingsAttendances.find(
      object =>
        object.user_ids.includes(user_id) &&
        object.attendance_id === attendance_id,
    );
  }
  async findByUserIdsAndAttendanceId(
    user_ids: string[],
    attendance_id: string,
  ): Promise<MeetingAttendance[]> {
    return this.meetingsAttendances.filter(
      object =>
        object.user_ids.some(uid => user_ids.includes(uid)) &&
        object.attendance_id === attendance_id,
    );
  }
  async findByUserIdAndDate(
    user_id: string,
    date: Date,
  ): Promise<MeetingAttendance> {
    return this.meetingsAttendances.find(
      object =>
        object.user_ids.includes(user_id) && object.attendances.date === date,
    );
  }
  async listByDate(date: Date): Promise<MeetingAttendance[]> {
    return this.meetingsAttendances.filter(
      object => object.attendances.date === date,
    );
  }
  async listInDateRange(
    startDate: Date,
    endDate: Date,
  ): Promise<MeetingAttendance[]> {
    return this.meetingsAttendances.filter(
      object =>
        object.attendances.date >= startDate &&
        object.attendances.date <= endDate,
    );
  }
}

export { IMeetingAttendanceRepositoryInMemory };
