import { User } from '@modules/accounts/domain/User'

import { Lodge } from '../domain/Lodge'

interface ILodgesRepository {
  create(lodge: Lodge): Promise<void>
  findAll(): Promise<Lodge[]>
  searchByName(name: string): Promise<Lodge>
  findUsersByLodgeId(id: string): Promise<User[]>
}

export { ILodgesRepository }
