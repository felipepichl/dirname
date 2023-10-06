import { User } from '@modules/accounts/domain/User'
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'
import { Lodge } from '@modules/lodge/domain/Lodge'
import { LodgesRepositoryInMemory } from '@modules/lodge/repositories/in-memory/LodgesRepositoryInMemory'
import { AppError } from '@shared/error/AppError'

import { AddMemberToLodgeUseCase } from './AddMemberToLodgeUseCase'

let lodgesRepositoryInMemory: LodgesRepositoryInMemory
let usersRepository: UsersRepositoryInMemory
let addMemberToLodgeUseCase: AddMemberToLodgeUseCase

async function createUser(
  name: string,
  email: string,
  password: string,
  phoneNumber: string,
): Promise<User> {
  const user = User.createUser({
    name,
    email,
    password,
    phoneNumber,
  })

  await usersRepository.create(user)

  return user
}

async function createLodge(
  name: string,
  foundingDate: Date,
  isActive: boolean,
): Promise<Lodge> {
  const lodge = Lodge.createLodge({
    name,
    foundingDate,
    isActive,
  })

  await lodgesRepositoryInMemory.create(lodge)

  return lodge
}

describe('[Lodge] - Add member to Lodge', () => {
  let member: User
  let lodge: Lodge

  beforeEach(async () => {
    usersRepository = new UsersRepositoryInMemory()
    lodgesRepositoryInMemory = new LodgesRepositoryInMemory()

    addMemberToLodgeUseCase = new AddMemberToLodgeUseCase(
      lodgesRepositoryInMemory,
      usersRepository,
    )

    member = await createUser(
      'User1',
      'user1@example.com',
      'password123',
      '1234567890',
    )

    lodge = await createLodge('lodgeName', new Date(2022, 3, 16), true)
  })

  it('should be able to add a member to lodge', async () => {
    const { id: lodgeId } = lodge
    const { id: userId } = member

    await addMemberToLodgeUseCase.execute({
      lodgeId: lodgeId.toString(),
      userId: userId.toString(),
    })

    const lodgeCreated = await lodgesRepositoryInMemory.findAll()

    // console.log(JSON.stringify(lodgeCreated, null, 2))

    expect(lodgeCreated).toBeDefined()
    expect(lodgeCreated[0].id).toEqual(lodge.id)
    expect(lodgeCreated[0].members[0]).toEqual(member.id.toString())
  })

  it('should not be able to add members with non existing user', async () => {
    await expect(
      addMemberToLodgeUseCase.execute({
        userId: 'non-existing',
        lodgeId: 'fake',
      }),
    ).rejects.toEqual(new AppError('User not found', 404))
  })

  it('should not be able to add members with non existing lodge', async () => {
    await expect(
      addMemberToLodgeUseCase.execute({
        userId: member.id.toString(),
        lodgeId: 'non-existing',
      }),
    ).rejects.toEqual(new AppError('Lodge not found', 404))
  })
})
