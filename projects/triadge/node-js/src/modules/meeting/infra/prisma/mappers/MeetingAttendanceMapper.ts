import { MeetingAttendance } from '@modules/meeting/domain/MeetingAttendance';
import { UserAttendance as RawMeetingAttendance } from '@prisma/client';

import { IMapper } from '@shared/core/infra/Mapper';

class MeetingAttendanceMapper
  implements IMapper<MeetingAttendance, RawMeetingAttendance>
{
  toPersistence(object: MeetingAttendance): MeetingAttendance {
    return object;
  }
  toDomain({ userId, attendanceId }: RawMeetingAttendance): MeetingAttendance {
    return MeetingAttendance.createMeetingAttendance({
      user_ids: [userId],
      attendance_id: attendanceId,
    });
  }
  toDomainArray(rawArray: RawMeetingAttendance[]): MeetingAttendance[] {
    return rawArray.map(this.toDomain);
  }
  getMapper(): IMapper<MeetingAttendance, RawMeetingAttendance> {
    return MeetingAttendanceMapper.getMapper();
  }

  static getMapper(): MeetingAttendanceMapper {
    return new MeetingAttendanceMapper();
  }
}

export { MeetingAttendanceMapper };
