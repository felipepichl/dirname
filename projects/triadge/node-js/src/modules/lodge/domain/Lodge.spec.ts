import { Lodge } from './Lodge'

describe('[Lodge] - Create a Lodge', () => {
  it('should be able to create a new instance of lodge', () => {
    const lodge = Lodge.createLodge({
      name: 'Name Example',
      foundingDate: new Date(),
      isActive: true,
    })

    expect(lodge instanceof Lodge).toBe(true)
    expect(lodge).toBeTruthy()
  })
})
