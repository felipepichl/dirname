import { UserAttendance } from '@modules/usersAttendances/domain/UserAttendance';
import { UserAttendance as RawUserAttendance } from '@prisma/client';

import { IMapper } from '@shared/core/infra/Mapper';

class UserAttendanceMapper
  implements IMapper<UserAttendance, RawUserAttendance>
{
  toPersistence(object: UserAttendance): UserAttendance {
    return object;
  }
  toDomain({ userId, attendanceId }: RawUserAttendance): UserAttendance {
    return UserAttendance.createUserAttendance({
      user_id: userId,
      attendance_id: attendanceId,
    });
  }
  toDomainArray(rawArray: RawUserAttendance[]): UserAttendance[] {
    return rawArray.map(this.toDomain);
  }
  getMapper(): IMapper<UserAttendance, RawUserAttendance> {
    return UserAttendanceMapper.getMapper();
  }

  static getMapper(): UserAttendanceMapper {
    return new UserAttendanceMapper();
  }
}

export { UserAttendanceMapper };
