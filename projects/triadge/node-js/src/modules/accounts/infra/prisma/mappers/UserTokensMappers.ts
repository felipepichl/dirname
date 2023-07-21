import { UserTokens } from '@modules/accounts/domain/UserTokens';
import { UserTokens as RawUserTokens } from '@prisma/client';

import { IMapper } from '@shared/core/infra/Mapper';

class UserTokensMappers implements IMapper<UserTokens, RawUserTokens> {
  toPersistence(object: UserTokens): UserTokens {
    return object;
  }
  toDomain({
    fk_user_id,
    expires_date,
    refresh_token,
  }: RawUserTokens): UserTokens {
    return UserTokens.createUserTokens({
      user_id: fk_user_id,
      expires_date,
      refresh_token,
    });
  }
  getMapper(): IMapper<UserTokens, RawUserTokens> {
    return new UserTokensMappers();
  }

  static getMapper(): UserTokensMappers {
    return new UserTokensMappers();
  }
}

export { UserTokensMappers };
