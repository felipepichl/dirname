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

  async addMembersToLodge(lodgeId: string, userId: string): Promise<void> {
    const lodge = this.lodges.find((lodge) => lodge.id.toString() === lodgeId)

    console.log(lodge)

    const clonedLodge = Object.assign(
      Object.create(Object.getPrototypeOf(lodge)),
      lodge,
    )

    clonedLodge.props = { ...clonedLodge.props, members: [userId] }

    console.log(clonedLodge)
  }
}

export { LodgesRepositoryInMemory }
