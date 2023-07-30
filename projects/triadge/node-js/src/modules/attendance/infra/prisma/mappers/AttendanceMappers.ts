import { Attendance } from '@modules/attendance/domain/Attendance';
import { Attendance as RawAttendance } from '@prisma/client';

import { IMapper } from '@shared/core/infra/Mapper';

class AttendanceMappers implements IMapper<Attendance, RawAttendance> {
  toPersistence(object: Attendance): Attendance {
    return object;
  }
  toDomain({ date, present, fk_user_id }: RawAttendance): Attendance {
    return Attendance.createAttendance({
      date,
      isPresent: present,
      user_id: fk_user_id,
    });
  }

  toDomainArray(rawArray: RawAttendance[]): Attendance[] {
    return rawArray.map(this.toDomain);
  }

  getMapper(): IMapper<Attendance, RawAttendance> {
    return AttendanceMappers.getMapper();
  }

  static getMapper(): AttendanceMappers {
    return new AttendanceMappers();
  }
}

export { AttendanceMappers };
