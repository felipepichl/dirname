import { UserTokens } from '@modules/accounts/domain/UserTokens';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';

import { getPrismaClient } from '@shared/infra/prisma';

import { UserTokensMappers } from '../mappers/UserTokensMappers';

class UsersTokensRepository implements IUsersTokensRepository {
  async create({
    user_id,
    expires_date,
    refresh_token,
  }: UserTokens): Promise<UserTokens> {
    const result = await getPrismaClient().userTokens.create({
      data: {
        fk_user_id: user_id,
        expires_date,
        refresh_token,
      },
    });

    // return UserTokensMappers.g;
  }
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserTokens> {
    throw new Error('Method not implemented.');
  }
  deleteById(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export { UsersTokensRepository };
