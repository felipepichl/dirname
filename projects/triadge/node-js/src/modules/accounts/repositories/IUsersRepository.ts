import { User } from '../domain/User'

interface IUsersRepository {
  create(user: User): Promise<void>
  findByEmail(email: string): Promise<User>
  findById(userId: string): Promise<User>
  findByIds(userIds: string[]): Promise<User[]>
  listAll(): Promise<User[]>
}

export { IUsersRepository }
