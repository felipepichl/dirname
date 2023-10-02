import { User } from '@modules/accounts/domain/User'

import { Lodge } from '@modules/lodge/domain/Lodge'
import { ILodgesRepository } from '../ILodgesRepository'

class LodgesRepositoryInMemory implements ILodgesRepository {
  private lodges: Lodge[] = []

  async create(lodge: Lodge): Promise<void> {
    this.lodges.push(lodge)
  }

  async findAll(): Promise<Lodge[]> {
    return this.lodges
  }

  async findById(lodgeId: string): Promise<Lodge> {
    return this.lodges.find((lodge) => lodge.id.toString() === lodgeId)
  }

  async searchByName(name: string): Promise<Lodge> {
    return this.lodges.find((lodge) => lodge.name === name)
  }

  async getMembersByLodgeId(id: string): Promise<User[]> {
    const lodge = this.lodges.find((lodge) => lodge.id.toString() === id)

    const { members } = lodge

    return members
  }
}

export { LodgesRepositoryInMemory }
