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

async function createUserAndListAll(token: string): Promise<string> {
  await request(app).post('/users').send({
    name: 'User First',
    email: 'user1@example.com',
    password: 'hash123',
    phoneNumber: '51999999999',
  })

  const response = await request(app)
    .get('/users')
    .set({
      Authorization: `Bearer ${token}`,
    })

  type UserResponse = {
    _id: string
  }

  const user: UserResponse[] = response.body.users

  return user[0]._id
}

async function createLodgeAndListAll(token: string): Promise<string> {
  await request(app)
    .post('/lodges')
    .set({
      Authorization: `Bearer ${token}`,
    })
    .send({
      name: 'Lodge_Name',
      foundingDate: new Date(2022, 3, 16),
      isActive: true,
    })

  const response = await request(app)
    .get('/lodges')
    .set({
      Authorization: `Bearer ${token}`,
    })

  type LodgeResponse = {
    _id: string
  }

  const lodge: LodgeResponse[] = response.body.lodges

  return lodge[0]._id
}

describe('[E2E] = Add member to Lodge', () => {
  it('should be able to add member to Lodge', async () => {
    const token = await authenticateUser()
    const member = await createUserAndListAll(token)
    const lodge = await createLodgeAndListAll(token)

    const response = await request(app)
      .post(`/lodges/${lodge}/members`)
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        userId: member,
      })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toBe('User added to the lodge successfully.')
  })
})
