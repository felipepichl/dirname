import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateSessionService from './CreateSessionServices';

import CreateUserService from './CreateUserServices';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let createUser: CreateUserService;
let createSession: CreateSessionService;

describe('CreateSession', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    createSession = new CreateSessionService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a new session', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'jonhdoe@example.com',
      password: 'hash123',
    });

    const response = await createSession.execute({
      email: 'jonhdoe@example.com',
      password: 'hash123',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to create session with non existing user', async () => {
    await expect(
      createSession.execute({
        email: 'jonhdoe@example.com',
        password: 'hash123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create session with invalid password', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'jonhdoe@example.com',
      password: 'hash123',
    });

    await expect(
      createSession.execute({
        email: 'jonhdoe@example.com',
        password: 'non-pass',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
