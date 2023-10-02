import { User } from '@modules/accounts/domain/User'
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'
import { Lodge } from '@modules/lodge/domain/Lodge'
import { LodgesRepositoryInMemory } from '@modules/lodge/repositories/in-memory/LodgesRepositoryInMemory'

import { GetMembersByLodgeId } from './GetMembersByLodgeId'

let lodgesRepositoryInMemory: LodgesRepositoryInMemory
let getMembersByLodgeId: GetMembersByLodgeId

async function createUser(
  name: string,
  email: string,
  password: string,
  phoneNumber: string,
): Promise<User> {
  const usersRepository = new UsersRepositoryInMemory()

  const user = User.createUser({
    name,
    email,
    password,
    phoneNumber,
  })

  await usersRepository.create(user)

  return user
}

describe('[Lodge] - Get members by lodgeId', () => {
  let user1: User
  let user2: User

  beforeEach(async () => {
    lodgesRepositoryInMemory = new LodgesRepositoryInMemory()

    getMembersByLodgeId = new GetMembersByLodgeId(lodgesRepositoryInMemory)

    user1 = await createUser(
      'User1',
      'user1@example.com',
      'password123',
      '1234567890',
    )
    user2 = await createUser(
      'User2',
      'user2@example.com',
      'password123',
      '1234567890',
    )
  })

  it('should be able to get members by lodgeId', async () => {
    const lodge = Lodge.createLodge({
      name: 'Lodge_1',
      foundingDate: new Date(2023, 3, 16),
      isActive: true,
      members: [user1, user2],
    })

    await lodgesRepositoryInMemory.create(lodge)

    const { id } = lodge

    const result = await getMembersByLodgeId.execute({
      lodgeId: id.toString(),
    })

    const retrievedAttendances = result.users
    expect(retrievedAttendances).toHaveLength(2)
    expect(result.lodge).toBeDefined()
    expect(result.users).toBeDefined()
    const [member1, member2] = retrievedAttendances.map((members) =>
      members.id.toString(),
    )
    expect(member1).toContain(user1.id.toString())
    expect(member2).toContain(user2.id.toString())
  })
})
