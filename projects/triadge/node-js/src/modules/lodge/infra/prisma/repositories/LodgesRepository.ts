import { User } from '@modules/accounts/domain/User'
import { Lodge } from '@modules/lodge/domain/Lodge'
import { ILodgesRepository } from '@modules/lodge/repositories/ILodgesRepository'

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

  findAll(): Promise<Lodge[]> {
    throw new Error('Method not implemented.')
  }

  searchByName(name: string): Promise<Lodge> {
    throw new Error('Method not implemented.')
  }

  findUsersByLodgeId(id: string): Promise<User[]> {
    throw new Error('Method not implemented.')
  }
}

export { LodgesRepository }
