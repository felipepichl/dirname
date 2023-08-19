import { Attendance } from '@modules/attendance/domain/Attendance'
import { Attendance as RawAttendance } from '@prisma/client'

import { IMapper } from '@shared/core/infra/Mapper'

class AttendanceMappers implements IMapper<Attendance, RawAttendance> {
  toPersistence(object: Attendance): Attendance {
    return object
  }

  toDomain(object: RawAttendance): Attendance {
    return Attendance.createAttendance(object)
  }

  toDomainArray(rawArray: RawAttendance[]): Attendance[] {
    return rawArray.map(this.toDomain)
  }

  getMapper(): IMapper<Attendance, RawAttendance> {
    return AttendanceMappers.getMapper()
  }

  static getMapper(): AttendanceMappers {
    return new AttendanceMappers()
  }
}

export { AttendanceMappers }
