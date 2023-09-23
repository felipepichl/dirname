import { Lodge } from '@modules/lodge/domain/Lodge'
import { LodgesRepositoryInMemory } from '@modules/lodge/repositories/in-memory/LodgesRepositoryInMemory'

import { AppError } from '@shared/error/AppError'

import { CreateLodgeUseCase } from './CreateLodgeUseCase'

let lodgesRepositoryInMemory: LodgesRepositoryInMemory
let createLodgeUseCase: CreateLodgeUseCase

describe('[Lodge] - Create a Lodge', () => {
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

  it('should not be able to create a new Lodge with same name for another', async () => {
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

    await expect(
      createLodgeUseCase.execute({ name, foundingDate, isActive }),
    ).rejects.toEqual(new AppError('Lodge already exists', 400))
  })
})
