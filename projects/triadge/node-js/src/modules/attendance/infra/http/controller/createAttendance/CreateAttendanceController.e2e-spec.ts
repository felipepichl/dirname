import request from 'supertest'

import { app } from '@shared/infra/http/start/app'

async function createUser(
  name: string,
  email: string,
  password: string,
  phoneNumber: string,
): Promise<void> {
  await request(app).post('/users').send({
    name,
    email,
    password,
    phoneNumber,
  })
}

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

describe('[E2E] = Create Attendance', () => {
  beforeAll(async () => {
    await createUser(
      'User First',
      'user1@example.com',
      'hash123',
      '51999999999',
    )

    await createUser(
      'User Second',
      'user2@example.com',
      'hash123',
      '51999999999',
    )

    await createUser(
      'User Third',
      'user3@example.com',
      'hash123',
      '51999999999',
    )
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
      .post('/meetings')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        date: new Date(),
      })

    const meetingResponse = await request(app)
      .get('/meetings')
      .set({
        Authorization: `Bearer ${token}`,
      })

    const [{ _id: meetingId }] = meetingResponse.body.meetings

    const response = await request(app)
      .post('/attendances')
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
