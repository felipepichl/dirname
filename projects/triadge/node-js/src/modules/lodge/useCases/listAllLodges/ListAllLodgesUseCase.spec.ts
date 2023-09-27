import { Lodge } from '@modules/lodge/domain/Lodge'
import { LodgesRepositoryInMemory } from '@modules/lodge/repositories/in-memory/LodgesRepositoryInMemory'

import { ListAllLodgesUseCase } from './ListAllLodgesUseCase'

let lodgesRepositoryInMemory: LodgesRepositoryInMemory
let listAllLodgesUseCase: ListAllLodgesUseCase

describe('[Lodge] - List all lodges', () => {
  beforeEach(() => {
    lodgesRepositoryInMemory = new LodgesRepositoryInMemory()
    listAllLodgesUseCase = new ListAllLodgesUseCase(lodgesRepositoryInMemory)
  })

  it('should be able to list all lodges', async () => {
    const lodge1 = Lodge.createLodge({
      name: 'lodge_name',
      foundingDate: new Date(),
      isActive: true,
    })

    const lodge2 = Lodge.createLodge({
      name: 'lodge_name',
      foundingDate: new Date(),
      isActive: true,
    })

    await lodgesRepositoryInMemory.create(lodge1)
    await lodgesRepositoryInMemory.create(lodge2)

    const result = await listAllLodgesUseCase.execute()
  })
})
