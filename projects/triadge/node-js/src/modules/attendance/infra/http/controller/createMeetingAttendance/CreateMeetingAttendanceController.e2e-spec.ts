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

describe('[E2E] = Create Meeting', () => {
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

  it('should be able to create a new metting', async () => {
    const token = await authenticateUser()

    const userResponse = await request(app)
      .get('/users')
      .set({
        Authorization: `Bearer ${token}`,
      })

    const { _id: userId1 } = userResponse.body.users[1]
    const { _id: userId2 } = userResponse.body.users[2]

    await request(app)
      .post('/attendances')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        date: new Date(),
        isPresent: true,
      })

    const attendanceResponse = await request(app)
      .get('/attendances')
      .set({
        Authorization: `Bearer ${token}`,
      })

    const { _id: attendanceId } = attendanceResponse.body[0]

    const response = await request(app)
      .post('/meeting')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        userIds: [userId1, userId2],
        attendanceId,
      })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toBe('Meeting created')
  })
})
