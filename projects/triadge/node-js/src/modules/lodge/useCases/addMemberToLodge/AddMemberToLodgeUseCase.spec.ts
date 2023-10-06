import { User } from '@modules/accounts/domain/User'
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'
import { Lodge } from '@modules/lodge/domain/Lodge'
import { LodgesRepositoryInMemory } from '@modules/lodge/repositories/in-memory/LodgesRepositoryInMemory'

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
  let member1: User
  let member2: User
  let lodge: Lodge

  beforeEach(async () => {
    usersRepository = new UsersRepositoryInMemory()
    lodgesRepositoryInMemory = new LodgesRepositoryInMemory()

    addMemberToLodgeUseCase = new AddMemberToLodgeUseCase(
      lodgesRepositoryInMemory,
      usersRepository,
    )

    member1 = await createUser(
      'User1',
      'user1@example.com',
      'password123',
      '1234567890',
    )

    member2 = await createUser(
      'User2',
      'user2@example.com',
      'password123',
      '1234567890',
    )

    lodge = await createLodge('lodgeName', new Date(2022, 3, 16), true)
  })

  it('should be able to add a member to lodge', async () => {
    const { id: lodgeId } = lodge
    const { id: userId } = member1

    console.log(lodgeId.toString(), userId.toString())

    await addMemberToLodgeUseCase.execute({
      lodgeId: lodgeId.toString(),
      userId: userId.toString(),
    })

    const lodgeCreated = await lodgesRepositoryInMemory.getMembersByLodgeId(
      lodgeId.toString(),
    )

    console.log(lodgeCreated)
  })
})
