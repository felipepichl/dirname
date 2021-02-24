import { v4 } from 'uuid';

import IUsersTokensRepository from '@modules/users/repositories/IUserTokensRepository';

import UserToken from '../../infra/typeorm/entities/UserToken';

class FakeUserTokensRepository implements IUsersTokensRepository {
  private userTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, { id: v4(), token: v4(), user_id });

    this.userTokens.push(userToken);

    return userToken;
  }
}

export default FakeUserTokensRepository;
