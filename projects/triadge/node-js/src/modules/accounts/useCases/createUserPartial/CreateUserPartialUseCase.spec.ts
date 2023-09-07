import { User } from '@modules/accounts/domain/User'
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'

import { AppError } from '@shared/error/AppError'

import { CreateUserPartialUseCase } from './CreateUserPartialUseCase'

let usersRepositoryInMemory: UsersRepositoryInMemory
let createUserPartialUseCase: CreateUserPartialUseCase

describe('[Account] - Create a user', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    createUserPartialUseCase = new CreateUserPartialUseCase(
      usersRepositoryInMemory,
    )
  })

  it('should be able to create a new user', async () => {
    const user = User.createUser({
      name: 'Jonh Due',
      email: 'johndue@example.com',
      password: 'hash123',
      phoneNumber: '51999999999',
    })

    await createUserPartialUseCase.execute(user)

    const { email } = user

    const userCreated = await usersRepositoryInMemory.findByEmail(email)

    expect(userCreated).toBeDefined()
    expect(userCreated?.email).toEqual(user.email)
  })

  it('should not be able to create a new user with same phone number another', async () => {
    const user = User.createUser({
      name: 'Jonh Due',
      email: 'johndue@example.com',
      password: 'hash123',
      phoneNumber: '51999999999',
    })

    await createUserPartialUseCase.execute(user)

    await expect(createUserPartialUseCase.execute(user)).rejects.toBeInstanceOf(
      AppError,
    )
  })
})
