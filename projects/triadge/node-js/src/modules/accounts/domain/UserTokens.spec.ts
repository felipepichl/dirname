import { UserTokens } from './UserTokens';

describe('[Account] - Create a new UserTokens', () => {
  it('should be able to create a new instance of userTokens', () => {
    const userTokens = UserTokens.createUserTokens({
      user_id: 'user_id',
      expires_date: new Date(),
      refresh_token: 'refresh_token',
    });

    expect(userTokens instanceof UserTokens).toBe(true);
    expect(userTokens).toBeTruthy();
    expect(userTokens.user_id).toBe('user_id');
  });
});
