import { User } from '@modules/accounts/domain/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

import { getPrismaClient } from '@shared/infra/prisma';

import { UserMappers } from '../mappers/UserMappers';

class UsersRepository implements IUsersRepository {
  async create({
    name,
    email,
    password,
    avatar,
    phoneNumber,
    role,
    level,
    fk_lodge_id,
    fk_address_id,
    startDate,
  }: User): Promise<void> {
    await getPrismaClient().user.create({
      data: {
        name,
        email,
        password,
        avatar,
        phoneNumber,
        role,
        level,
        fk_lodge_id,
        fk_address_id,
        startDate,
      },
    });
  }
  async findByEmail(email: string): Promise<User> {
    const result = await getPrismaClient().user.findFirst({
      where: { email },
    });

    return UserMappers.getMapper().toDomain(result);
  }
  async findById(user_id: string): Promise<User> {
    const result = await getPrismaClient().user.findFirst({
      where: { id: user_id },
    });

    return UserMappers.getMapper().toDomain(result);
  }
}

export { UsersRepository };
