import { Lodge } from '@modules/lodge/domain/Lodge'
import { LodgesRepositoryInMemory } from '@modules/lodge/repositories/in-memory/LodgesRepositoryInMemory'

import { GetMembersByLodgeId } from './GetMembersByLodgeId'

let lodgesRepositoryInMemory: LodgesRepositoryInMemory
let getMembersByLodgeId: GetMembersByLodgeId

describe('[Lodge] - Get members by lodgeId', () => {
  beforeEach(async () => {
    lodgesRepositoryInMemory = new LodgesRepositoryInMemory()

    getMembersByLodgeId = new GetMembersByLodgeId(lodgesRepositoryInMemory)
  })

  it('should be able to get members by lodgeId', async () => {
    const lodge = Lodge.createLodge({
      name: 'Lodge_1',
      foundingDate: new Date(2023, 3, 16),
      isActive: true,
    })

    await lodgesRepositoryInMemory.create(lodge)

    const { id } = lodge

    const result = await getMembersByLodgeId.execute({
      lodgeId: id.toString(),
    })

    console.log(result)
  })
})
