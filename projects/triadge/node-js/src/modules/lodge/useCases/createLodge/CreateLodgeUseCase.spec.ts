import { Lodge } from '@modules/lodge/domain/Lodge'
import { LodgesRepositoryInMemory } from '@modules/lodge/repositories/in-memory/LodgesRepositoryInMemory'

import { CreateLodgeUseCase } from './CreateLodgeUseCase'

let lodgesRepositoryInMemory: LodgesRepositoryInMemory
let createLodgeUseCase: CreateLodgeUseCase

describe('[Lodge] - Create Lodge', () => {
  beforeEach(() => {
    lodgesRepositoryInMemory = new LodgesRepositoryInMemory()

    createLodgeUseCase = new CreateLodgeUseCase(lodgesRepositoryInMemory)
  })

  it('should be able to create a new Lodge', async () => {
    const lodge = Lodge.createLodge({
      name: 'lodge_name',
      foundingDate: new Date(),
      isActive: true,
    })

    const { name, foundingDate, isActive } = lodge

    await createLodgeUseCase.execute({
      name,
      foundingDate,
      isActive,
    })

    const lodgeCreated = await lodgesRepositoryInMemory.searchByName(name)

    expect(lodgeCreated).toBeDefined()
    expect(lodgeCreated?.name).toEqual(name)
  })
})
