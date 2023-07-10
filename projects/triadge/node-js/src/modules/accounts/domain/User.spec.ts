import { User } from './User'

describe('Create a new User', () => {
  it('should be able to create a new instance of user', () => {
    const user = User.createUser({
      name: 'Jonh Due',
      email: 'johndue@example.com',
      password: 'hash123',
      avatar: 'avatar_url',
      phoneNumber: '51999999999',
      isPresent: true,
      role: 'role',
      level: 'level',
      lodge: 'lodge',
      address: 'address',
      startDate: new Date(),
    })

    expect(user instanceof User).toBe(true)
    expect(user).toBeTruthy()
  })
})
