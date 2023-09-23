import { LodgesRepositoryInMemory } from '@modules/lodge/repositories/in-memory/LodgesRepositoryInMemory'

let lodgesRepositoryInMemory: LodgesRepositoryInMemory

describe('[Lodge] - Create Lodge', () => {
  beforeEach(() => {
    lodgesRepositoryInMemory = new LodgesRepositoryInMemory()
  })

  it('should be able to create a new Lodge', () => {})
})
