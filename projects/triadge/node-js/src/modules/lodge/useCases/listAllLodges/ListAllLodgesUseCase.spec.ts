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
      name: 'lodge_name_1',
      foundingDate: new Date(),
      isActive: true,
    })

    const lodge2 = Lodge.createLodge({
      name: 'lodge_name_2',
      foundingDate: new Date(),
      isActive: true,
    })

    await lodgesRepositoryInMemory.create(lodge1)
    await lodgesRepositoryInMemory.create(lodge2)

    const { lodges } = await listAllLodgesUseCase.execute()

    expect(lodges).toHaveLength(2)
    expect(lodges).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: lodge1.id,
          name: 'lodge_name_1',
        }),
        expect.objectContaining({
          id: lodge2.id,
          name: 'lodge_name_2',
        }),
      ]),
    )
  })

  it('should return an empty array if no lodges exist', async () => {
    const result = await listAllLodgesUseCase.execute()

    expect(result.lodges).toHaveLength(0)
  })
})
