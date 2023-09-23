import { ILodgesRepositoryInMemory } from '@modules/lodge/repositories/in-memory/ILodgesRepositoryInMemory'

let lodgesRepositoryInMemory: ILodgesRepositoryInMemory

describe('[Lodge] - Create Lodge', () => {
  beforeEach(() => {
    lodgesRepositoryInMemory = new ILodgesRepositoryInMemory()
  })

  it('should be able to create a new Lodge', () => {})
})
