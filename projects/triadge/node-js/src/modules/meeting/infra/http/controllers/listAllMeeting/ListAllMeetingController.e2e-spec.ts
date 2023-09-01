import request from 'supertest'

import { app } from '@shared/infra/http/start/app'

async function createUser() {
  return request(app).post('/users').send({
    name: 'Jonh Due',
    email: 'johndue@example.com',
    password: 'hash123',
    phoneNumber: '51999999999',
  })
}

async function authenticateUser() {
  const response = await request(app).post('/sessions').send({
    email: 'johndue@example.com',
    password: 'hash123',
  })
  const { token } = response.body
  return token
}

async function createMeeting(token: string, date: Date) {
  return request(app)
    .post('/meetings')
    .set({ Authorization: `Bearer ${token}` })
    .send({ date })
}

describe('[E2E] = List all meetings', () => {
  let token: string

  beforeAll(async () => {
    await createUser()
    token = await authenticateUser()
  })

  it('should be able to list all meetings', async () => {
    await createMeeting(token, new Date(2022, 3, 16))
    await createMeeting(token, new Date(2022, 3, 19))

    const response = await request(app)
      .get('/meetings')
      .set({ Authorization: `Bearer ${token}` })

    const { meetings } = response.body

    expect(response.status).toBe(200)
    expect(meetings).toHaveLength(2)
  })
})
