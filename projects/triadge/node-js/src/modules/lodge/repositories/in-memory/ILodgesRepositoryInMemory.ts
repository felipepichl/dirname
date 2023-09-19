import { User } from '@modules/accounts/domain/User'
import { Lodge } from '@modules/lodge/domain/Lodge'

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
    // const users = this.lodges
    //   .filter((lodge) => lodge.user && lodge.user.fk_lodge_id === id)
    //   .map((lodge) => lodge.user)
    // return users
  }
}

export { ILodgesRepositoryInMemory }
