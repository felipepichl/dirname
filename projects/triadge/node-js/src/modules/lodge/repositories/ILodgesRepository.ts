import { User } from '@modules/accounts/domain/User'

import { Lodge } from '../domain/Lodge'

interface ILodgesRepository {
  create(lodge: Lodge): Promise<void>
  findAll(): Promise<Lodge[]>
  findById(lodgeId: string): Promise<Lodge>
  searchByName(name: string): Promise<Lodge>
  getMembersByLodgeId(id: string): Promise<User[]>
  addMembersToLodge(lodgeId: string, userId: string): Promise<void>
}

export { ILodgesRepository }
