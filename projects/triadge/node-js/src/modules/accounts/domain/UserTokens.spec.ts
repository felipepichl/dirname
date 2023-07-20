import { UserTokens } from './UserTokens';

describe('Create a new UserTokens', () => {
  it('should be able to create a new instance of userTokens', () => {
    const userTokens = UserTokens.createUserTokens({
      user_id: 'user_id',
      expires_date: new Date(),
      refresh_token: 'refresh_token',
    });

    expect(userTokens instanceof UserTokens).toBe(true);
    expect(userTokens).toBeTruthy();
  });
});
