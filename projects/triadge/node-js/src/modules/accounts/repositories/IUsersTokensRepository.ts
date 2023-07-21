import { UserTokens } from '../domain/UserTokens';

interface IUsersTokensRepository {
  create({
    user_id,
    expires_date,
    refresh_token,
  }: UserTokens): Promise<UserTokens>;
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserTokens>;
  deleteById(id: string): Promise<void>;
}

export { IUsersTokensRepository };
