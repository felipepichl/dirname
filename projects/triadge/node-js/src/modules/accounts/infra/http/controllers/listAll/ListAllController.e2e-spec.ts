import request from 'supertest'

import { app } from '@shared/infra/http/start/app'

async function authenticateUser() {
  const response = await request(app).post('/sessions').send({
    email: 'johndue@example.com',
    password: 'hash123',
  })
  const { token } = response.body
  return token
}

describe('[E2E] = List all Users', () => {
  beforeAll(async () => {
    await request(app).post('/users').send({
      name: 'Jonh Due',
      email: 'johndue@example.com',
      password: 'hash123',
      phoneNumber: '51999999999',
    })

    await request(app).post('/users').send({
      name: 'User 1',
      email: 'user1@example.com',
      password: 'hash123',
      phoneNumber: '51999999999',
    })

    await request(app).post('/users').send({
      name: 'User 2',
      email: 'user2@example.com',
      password: 'hash123',
      phoneNumber: '51999999999',
    })
  })

  it('should be able to list all users', async () => {
    const token = await authenticateUser()

    const response = await request(app)
      .get('/users')
      .set({
        Authorization: `Bearer ${token}`,
      })

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body.users)).toBe(true)
    expect(response.body.users.length).toBe(3)
  })
})
