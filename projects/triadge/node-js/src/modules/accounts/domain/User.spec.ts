import { User } from './User';

describe('Create a new User', () => {
  it('should be able to create a new instance of user', () => {
    const user = User.createUser({
      name: 'Jonh Due',
      email: 'johndue@example.com',
      password: 'hash123',
      phoneNumber: '51999999999',
      role: 'role',
      level: 'level',
      fk_lodge_id: 'fk_lodge_id',
      fk_address_id: 'fk_address_id',
      startDate: new Date(),
    });

    expect(user instanceof User).toBe(true);
    expect(user).toBeTruthy();
  });
});
