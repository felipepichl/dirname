import { User } from '@modules/accounts/domain/User';
import { HashProviderInMemory } from '@modules/accounts/providers/HashProvider/in-memory/HashProviderInMemory';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '@modules/accounts/useCases/createUser/CreateUserUseCase';
import { UploadUserAvatarUseCase } from '@modules/accounts/useCases/uploadUserAvatar/UploadUserAvatarUseCase';

import { StorageProviderInMemory } from '@shared/container/providers/StorageProvider/in-memory/StorageProviderInMemory';
import { AppError } from '@shared/error/AppError';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let hashProviderInMemory: HashProviderInMemory;
let storageProvider: StorageProviderInMemory;
let createUserUseCase: CreateUserUseCase;
let uploadUserAvatarUseCase: UploadUserAvatarUseCase;

describe('Upload Avatar', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    hashProviderInMemory = new HashProviderInMemory();
    storageProvider = new StorageProviderInMemory();

    createUserUseCase = new CreateUserUseCase(
      usersRepositoryInMemory,
      hashProviderInMemory,
    );
    uploadUserAvatarUseCase = new UploadUserAvatarUseCase(
      usersRepositoryInMemory,
      storageProvider,
    );
  });

  it('should be able to upload an user avatar', async () => {
    const user = User.createUser({
      name: 'Jonh Due',
      email: 'johndue@example.com',
      password: 'hash123',
      avatar: 'avatar_url',
      phoneNumber: '51999999999',
      role: 'role',
      level: 'level',
      fk_lodge_id: 'fk_lodge_id',
      fk_address_id: 'fk_address_id',
      startDate: new Date(),
    });

    await createUserUseCase.execute(user);

    const { email } = user;

    const userCreated = await usersRepositoryInMemory.findByEmail(email);

    const { id } = userCreated;

    await uploadUserAvatarUseCase.execute({
      user_id: id.toString(),
      avatar_file: 'avatar.jpg',
    });

    expect(userCreated.avatar).toBe('avatar.jpg');
  });

  it('should be able to upload avatar a non-existing user', async () => {
    await expect(
      uploadUserAvatarUseCase.execute({
        user_id: 'non-existing',
        avatar_file: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
