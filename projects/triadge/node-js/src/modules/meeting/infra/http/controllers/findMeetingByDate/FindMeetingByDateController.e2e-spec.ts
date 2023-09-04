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

async function createUser(
  name: string,
  email: string,
  password: string,
  phoneNumber: string,
): Promise<string> {
  await request(app).post('/users').send({
    name,
    email,
    password,
    phoneNumber,
  })

  const token = await authenticateUser()

  const response = await request(app)
    .get('/users')
    .set({
      Authorization: `Bearer ${token}`,
    })

  const { users } = response.body

  const user = users.find((u) => u.props.email === email)

  console.log(response.body)

  if (!user) {
    throw new Error(`User with email ${email} was not found`)
  }
  return user.id
}

async function createMeeting(token: string, date: Date) {
  return request(app)
    .post('/meetings')
    .set({ Authorization: `Bearer ${token}` })
    .send({ date })
}

async function createAttendance(
  token: string,
  userIds: string[],
  meetingId: string,
) {
  return request(app)
    .post('/attendance')
    .set({ Authorization: `Bearer ${token}` })
    .send({ userIds, meetingId })
}

describe('[E2E] = Find Meeting By Date', () => {
  let token: string
  let userId: string

  beforeAll(async () => {
    userId = await createUser(
      'John Doe',
      'johndoe@example.com',
      'password123',
      '1234567890',
    )
    token = await authenticateUser()
  })

  it('should be able to find a meeting by its date', async () => {
    console.log(userId)
  })
})
