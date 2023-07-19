import { User } from '@modules/accounts/domain/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

import { getPrismaClient } from '@shared/infra/prisma';

import { UserMappers } from '../mappers/UserMappers';

class UsersRepository implements IUsersRepository {
  async create({ name, email, password }: User): Promise<void> {
    await getPrismaClient().user.create({
      data: { name, email, password },
    });
  }
  findByEmail(email: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  findById(user_id: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
}

export { UsersRepository };
