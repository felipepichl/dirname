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

describe('[E2E] = List all meetings', () => {
  beforeAll(async () => {
    await request(app).post('/users').send({
      name: 'Jonh Due',
      email: 'johndue@example.com',
      password: 'hash123',
      phoneNumber: '51999999999',
    })
  })

  it('should be able to list all meetings', async () => {
    const token = await authenticateUser()

    await request(app)
      .post('/meetings')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        date: new Date(2022, 3, 16),
      })

    await request(app)
      .post('/meetings')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        date: new Date(2022, 3, 19),
      })

    const response = await request(app)
      .get('/meetings')
      .set({
        Authorization: `Bearer ${token}`,
      })

    const { meetings } = response.body.meetings

    expect(response.status).toBe(200)
    expect(meetings).toHaveLength(2)
  })
})
