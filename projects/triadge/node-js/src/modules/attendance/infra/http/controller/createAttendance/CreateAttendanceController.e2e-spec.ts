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

describe('[E2E] = Create Attendance', () => {
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

  it('should be able to create a new attendance', async () => {
    const token = await authenticateUser()

    const userResponse = await request(app)
      .get('/users')
      .set({
        Authorization: `Bearer ${token}`,
      })

    const { _id: userId1 } = userResponse.body.users[1]
    const { _id: userId2 } = userResponse.body.users[2]

    await request(app)
      .post('/meeting')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        date: new Date(),
        isPresent: true,
      })

    const meetingResponse = await request(app)
      .get('/meeting')
      .set({
        Authorization: `Bearer ${token}`,
      })

    const { _id: meetingId } = meetingResponse.body[0]

    const response = await request(app)
      .post('/attendance')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        userIds: [userId1, userId2],
        meetingId,
      })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toBe('Attendance created')
  })
})
