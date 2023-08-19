import { UserTokens } from '@modules/accounts/domain/UserTokens'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'

import { PrismaSingleton } from '@shared/infra/prisma'

import { UserTokensMappers } from '../mappers/UserTokensMappers'

class UsersTokensRepository implements IUsersTokensRepository {
  async create({
    user_id,
    expires_date,
    refresh_token,
  }: UserTokens): Promise<UserTokens> {
    const result = await PrismaSingleton.getInstance().userTokens.create({
      data: {
        fk_user_id: user_id,
        expires_date,
        refresh_token,
      },
    })

    return UserTokensMappers.getMapper().toDomain(result)
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserTokens> {
    const result = await PrismaSingleton.getInstance().userTokens.findFirst({
      where: { fk_user_id: user_id, refresh_token },
    })

    return UserTokensMappers.getMapper().toDomain(result)
  }

  async deleteById(id: string): Promise<void> {
    await PrismaSingleton.getInstance().userTokens.delete({
      where: { id },
    })
  }
}

export { UsersTokensRepository }
