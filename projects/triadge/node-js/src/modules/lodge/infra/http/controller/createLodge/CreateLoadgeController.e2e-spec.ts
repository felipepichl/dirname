import request from 'supertest'

import { app } from '@shared/infra/http/start/app'

async function authenticateUser() {
  await request(app).post('/users').send({
    name: 'Jonh Due',
    email: 'johndue@example.com',
    password: 'hash123',
    phoneNumber: '51999999999',
  })

  const response = await request(app).post('/sessions').send({
    email: 'johndue@example.com',
    password: 'hash123',
  })
  const { token } = response.body
  return token
}

describe('[E2E] = Create Lodge', () => {
  it('should be able to create a new Lodge', async () => {
    const token = await authenticateUser()

    const response = await request(app)
      .post('/lodges')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        name: 'Lodge_Name',
        foundingDate: new Date(2022, 3, 16),
        isActive: true,
      })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toBe('Lodge created')
  })
})
