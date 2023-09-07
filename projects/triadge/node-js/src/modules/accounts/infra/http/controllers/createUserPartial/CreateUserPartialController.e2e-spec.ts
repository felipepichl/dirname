import request from 'supertest'

import { app } from '@shared/infra/http/start/app'

describe('[E2E] = Create User', () => {
  it('should be able to create a new partial user', async () => {
    const response = await request(app).post('/users/partial').send({
      name: 'Jonh Due',
      phoneNumber: '51999999999',
    })

    expect(response.status).toBe(201)
  })
})
