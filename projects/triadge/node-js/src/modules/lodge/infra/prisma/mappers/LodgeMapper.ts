import { Lodge } from '@modules/lodge/domain/Lodge'
import { Lodge as RawLodge } from '@prisma/client'

import { IMapper } from '@shared/core/infra/Mapper'

class LodgeMapper implements IMapper<Lodge, RawLodge> {
  toPersistence(object: Lodge): Lodge {
    return object
  }

  toDomain({ name, foundingDate, isActive }: RawLodge): Lodge {
    return Lodge.createLodge({ name, foundingDate, isActive })
  }

  toDomainArray(rawArray: RawLodge[]): Lodge[] {
    return rawArray.map(this.toDomain)
  }

  getMapper(): IMapper<Lodge, RawLodge> {
    return LodgeMapper.getMapper()
  }

  static getMapper(): LodgeMapper {
    return new LodgeMapper()
  }
}

export { LodgeMapper }
