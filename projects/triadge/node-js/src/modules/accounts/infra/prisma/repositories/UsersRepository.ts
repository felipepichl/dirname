import { User } from '@modules/accounts/domain/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

import { getPrismaClient } from '@shared/infra/prisma';

import { UserMappers } from '../mappers/UserMappers';

class UsersRepository implements IUsersRepository {
  async create({ name, email, password, phoneNumber }: User): Promise<void> {
    await getPrismaClient.getInstance().user.create({
      data: {
        name,
        email,
        password,
        phoneNumber,
      },
    });
  }
  async findByEmail(email: string): Promise<User> {
    const result = await getPrismaClient.getInstance().user.findFirst({
      where: { email },
    });

    if (!result) {
      return null;
    }

    return UserMappers.getMapper().toDomain(result);
  }
  async findById(user_id: string): Promise<User> {
    const result = await getPrismaClient.getInstance().user.findFirst({
      where: { id: user_id },
    });

    return UserMappers.getMapper().toDomain(result);
  }
}

export { UsersRepository };
