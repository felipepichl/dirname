import request from 'supertest'

import { app } from '@shared/infra/http/start/app'

async function authenticateUser(): Promise<string> {
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

async function addMemberToLodge(
  token: string,
  lodgeId: string,
  userId: string,
): Promise<void> {
  await request(app)
    .post(`/lodges/${lodgeId}/members`)
    .set({
      Authorization: `Bearer ${token}`,
    })
    .send({
      userId,
    })
}

describe('[E2E] = Get member by lodgeId', () => {
  it('should be able to get member by lodge id', async () => {
    const token = await authenticateUser()
    const userId = await createUserAndListAll(token)
    const lodgeId = await createLodgeAndListAll(token)

    await addMemberToLodge(token, lodgeId, userId)

    const response = await request(app)
      .get(`/lodges/${lodgeId}/members`)
      .set({
        Authorization: `Bearer ${token}`,
      })

    // console.log(JSON.stringify(response.body, null, 2))

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('lodge')
    expect(response.body).toHaveProperty('members')
    expect(response.body.lodge).toHaveProperty('_id', lodgeId)
    expect(response.body.lodge.props).toHaveProperty('name')
    expect(response.body.lodge.props).toHaveProperty('foundingDate')
    expect(response.body.members).toBeInstanceOf(Array)
    expect(response.body.members.length).toBeGreaterThan(0)

    const member = response.body.members.find(
      (m: { _id: string }) => m._id === userId,
    )
    expect(member).toBeDefined()
  })
})
