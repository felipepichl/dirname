import { User } from '@modules/accounts/domain/User'

import { IUsersRepository } from '../IUsersRepository'

class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = []

  async create(user: User): Promise<void> {
    this.users.push(user)
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email)

    return user
  }

  async findById(user_id: string): Promise<User> {
    const user = this.users.find((user) => user.id.toString() === user_id)

    return user
  }

  async findByIds(user_ids: string[]): Promise<User[]> {
    return this.users.filter((user) => user_ids.includes(user.id.toString()))
  }
}

export { UsersRepositoryInMemory }
