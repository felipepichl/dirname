import { User } from '@modules/accounts/domain/User';
import { HashProviderInMemory } from '@modules/accounts/providers/HashProvider/in-memory/HashProviderInMemory';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';

import { AppError } from '@shared/error/AppError';

import { CreateUserUseCase } from './CreateUserUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let hashProviderInMemory: HashProviderInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Create a user', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    hashProviderInMemory = new HashProviderInMemory();
    createUserUseCase = new CreateUserUseCase(
      usersRepositoryInMemory,
      hashProviderInMemory,
    );
  });

  it('should be able to create a new user', async () => {
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
    });

    await createUserUseCase.execute(user);

    const { id } = user;

    const userCreated = await usersRepositoryInMemory.findById(id.toString());

    expect(userCreated).toBeDefined();
    expect(userCreated?.name).toEqual(user.email);
  });

  it('should not be able to create a new user with same email another', async () => {
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
    });

    await createUserUseCase.execute(user);

    await expect(createUserUseCase.execute(user)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
