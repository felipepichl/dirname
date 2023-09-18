import { Lodge } from './Lodge'

describe('[Account] - Create a Lodge', () => {
  it('should be able to create a new instance of lodge', () => {
    const lodge = Lodge.createLodge({
      name: 'Name Example',
      description: 'Description Example',
    })

    expect(lodge instanceof Lodge).toBe(true)
    expect(lodge).toBeTruthy()
  })
})
