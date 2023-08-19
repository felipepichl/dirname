import { UserTokens } from '@modules/accounts/domain/UserTokens'
import { UserTokens as RawUserTokens } from '@prisma/client'

import { IMapper } from '@shared/core/infra/Mapper'

class UserTokensMappers implements IMapper<UserTokens, RawUserTokens> {
  toPersistence(object: UserTokens): UserTokens {
    return object
  }

  toDomain({ fkUserId, expiresDate, refreshToken }: RawUserTokens): UserTokens {
    return UserTokens.createUserTokens({
      userId: fkUserId,
      expiresDate,
      refreshToken,
    })
  }

  toDomainArray(rawArray: RawUserTokens[]): UserTokens[] {
    return rawArray.map(this.toDomain)
  }

  getMapper(): IMapper<UserTokens, RawUserTokens> {
    return new UserTokensMappers()
  }

  static getMapper(): UserTokensMappers {
    return new UserTokensMappers()
  }
}

export { UserTokensMappers }
