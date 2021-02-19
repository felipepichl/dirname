import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserServices';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'jonhdoe@example.com',
      password: 'hash123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create two users with the same email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    createUser.execute({
      name: 'John Doe',
      email: 'jonhdoe@example.com',
      password: 'hash123',
    });

    expect(
      createUser.execute({
        name: 'John Doe',
        email: 'jonhdoe@example.com',
        password: 'hash123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
