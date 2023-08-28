import { Meeting } from '@modules/meeting/domain/Meeting'
import { Meeting as RawMeeting } from '@prisma/client'

import { IMapper } from '@shared/core/infra/Mapper'

class MeetingMappers implements IMapper<Meeting, RawMeeting> {
  toPersistence(object: Meeting): Meeting {
    return object
  }

  toDomain(object: RawMeeting): Meeting {
    return Meeting.createMeeting(object)
  }

  toDomainArray(rawArray: RawMeeting[]): Meeting[] {
    return rawArray.map(this.toDomain)
  }

  getMapper(): IMapper<Meeting, RawMeeting> {
    return MeetingMappers.getMapper()
  }

  static getMapper(): MeetingMappers {
    return new MeetingMappers()
  }
}

export { MeetingMappers }
