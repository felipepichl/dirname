import { ILodgesRepository } from '@modules/lodge/repositories/ILodgesRepository'

import { User } from '@modules/accounts/domain/User'
import { UserMappers } from '@modules/accounts/infra/prisma/mappers/UserMappers'
import { Lodge } from '@modules/lodge/domain/Lodge'
import { LodgeMapper } from '../mappers/LodgeMapper'

import { PrismaSingleton } from '@shared/infra/prisma'

class LodgesRepository implements ILodgesRepository {
  async create({ name, foundingDate, isActive }: Lodge): Promise<void> {
    await PrismaSingleton.getInstance().lodge.create({
      data: {
        name,
        foundingDate,
        isActive,
      },
    })
  }

  async findAll(): Promise<Lodge[]> {
    const result = await PrismaSingleton.getInstance().lodge.findMany()

    if (!result) {
      return null
    }

    return LodgeMapper.getMapper().toDomainArray(result)
  }

  async searchByName(name: string): Promise<Lodge> {
    const result = await PrismaSingleton.getInstance().lodge.findFirst({
      where: { name },
    })

    if (!result) {
      return null
    }
    return LodgeMapper.getMapper().toDomain(result)
  }

  async findUsersByLodgeId(id: string): Promise<User[]> {
    const result = await PrismaSingleton.getInstance().lodge.findUnique({
      where: { id },
      include: { members: true },
    })

    if (!result) {
      return null
    }

    return UserMappers.getMapper().toDomainArray(result.members)
  }
}

export { LodgesRepository }
