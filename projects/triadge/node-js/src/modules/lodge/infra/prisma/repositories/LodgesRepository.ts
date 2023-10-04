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

  async findById(lodgeId: string): Promise<Lodge> {
    const result = await PrismaSingleton.getInstance().lodge.findFirst({
      where: { id: lodgeId },
    })

    return LodgeMapper.getMapper().toDomain(result)
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

  async getMembersByLodgeId(id: string): Promise<User[]> {
    const result = await PrismaSingleton.getInstance().lodge.findUnique({
      where: { id },
      include: { members: true },
    })

    if (!result) {
      return null
    }

    return UserMappers.getMapper().toDomainArray(result.members)
  }

  async addMembersToLodge(lodgeId: string, userId: string): Promise<void> {
    await PrismaSingleton.getInstance().lodge.update({
      where: { id: lodgeId },
      data: {
        members: {
          connect: { id: userId },
        },
      },
    })
  }
}

export { LodgesRepository }
