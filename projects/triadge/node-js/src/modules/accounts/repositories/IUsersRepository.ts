import { User } from '../domain/User';

interface IUsersRepository {
  create(user: User): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(user_id: string): Promise<User>;
  findByIds(user_ids: string[]): Promise<User[]>;
}

export { IUsersRepository };
