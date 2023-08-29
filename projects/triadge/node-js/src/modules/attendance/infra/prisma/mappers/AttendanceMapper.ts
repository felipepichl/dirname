import { Attendance } from '@modules/attendance/domain/Attendance'
import { Attendance as RawAttendance } from '@prisma/client'

import { IMapper } from '@shared/core/infra/Mapper'

class AttendanceMapper implements IMapper<Attendance, RawAttendance> {
  toPersistence(object: Attendance): Attendance {
    return object
  }

  toDomain({ userId, meetingId }: RawAttendance): Attendance {
    return Attendance.createAttendance({
      userIds: [userId],
      meetingId,
    })
  }

  toDomainArray(rawArray: RawAttendance[]): Attendance[] {
    return rawArray.map(this.toDomain)
  }

  getMapper(): IMapper<Attendance, RawAttendance> {
    return AttendanceMapper.getMapper()
  }

  static getMapper(): AttendanceMapper {
    return new AttendanceMapper()
  }
}

export { AttendanceMapper }
