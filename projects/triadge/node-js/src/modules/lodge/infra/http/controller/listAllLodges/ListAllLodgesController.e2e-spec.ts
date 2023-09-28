import request from 'supertest'

import { app } from '@shared/infra/http/start/app'

async function authenticateAndCreateUser() {
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

async function createLodge(token: string) {
  await request(app)
    .post('/lodges')
    .set({
      Authorization: `Bearer ${token}`,
    })
    .send({
      name: 'Lodge_Name_1',
      foundingDate: new Date(2022, 3, 16),
      isActive: true,
    })

  await request(app)
    .post('/lodges')
    .set({
      Authorization: `Bearer ${token}`,
    })
    .send({
      name: 'Lodge_Name_2',
      foundingDate: new Date(2022, 3, 16),
      isActive: true,
    })
}

describe('[E2E] = List all lodges', () => {
  let token: string

  beforeEach(async () => {
    token = await authenticateAndCreateUser()
    await createLodge(token)
  })

  it('should be able to list all lodges', async () => {
    const response = await request(app)
      .get('/lodges')
      .set({
        Authorization: `Bearer ${token}`,
      })

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body.lodges)).toBe(true)
    expect(response.body.lodges.length).toBe(2)
  })
})
