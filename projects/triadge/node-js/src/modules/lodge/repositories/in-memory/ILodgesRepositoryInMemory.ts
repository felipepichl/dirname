import { Lodge } from '@modules/lodge/domain/Lodge'

import { User } from '@modules/accounts/domain/User'
import { UserMappers } from '@modules/accounts/infra/prisma/mappers/UserMappers'

import { ILodgesRepository } from '../ILodgesRepository'

class ILodgesRepositoryInMemory implements ILodgesRepository {
  private lodges: Lodge[] = []

  async create(lodge: Lodge): Promise<void> {
    this.lodges.push(lodge)
  }

  async findAll(): Promise<Lodge[]> {
    return this.lodges
  }

  async searchByName(name: string): Promise<Lodge> {
    return this.lodges.find((lodge) => lodge.name === name)
  }

  async findUsersByLodgeId(id: string): Promise<User[]> {
    const lodge = this.lodges.find((lodge) => lodge.id.toString() === id)

    return UserMappers.getMapper().toDomainArray(lodge.members)
  }
}

export { ILodgesRepositoryInMemory }
