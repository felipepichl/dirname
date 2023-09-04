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

  type UserProps = {
    email: string
  }

  type UserResponse = {
    _id: string
    props: UserProps
  }

  const users: UserResponse[] = response.body.users

  const user = users.find((account) => account.props.email === email)

  return user._id
}

async function createMeeting(token: string, date: Date) {
  await request(app)
    .post('/meetings')
    .set({ Authorization: `Bearer ${token}` })
    .send({ date })

  const meetingsResponse = await request(app)
    .get('/meetings')
    .set({ Authorization: `Bearer ${token}` })

  const { _id } = meetingsResponse.body.meetings[0]

  return _id
}

async function createAttendance(
  token: string,
  userIds: string[],
  meetingId: string,
) {
  return request(app)
    .post('/attendances')
    .set({ Authorization: `Bearer ${token}` })
    .send({ userIds, meetingId })
}

describe('[E2E] = Find Meeting By Date', () => {
  let token: string
  const userIds: string[] = []
  let meetingId: string
  const meetingDate = new Date(2022, 3, 16)

  beforeAll(async () => {
    const userId1 = await createUser(
      'User1',
      'user1@example.com',
      'password123',
      '1234567890',
    )
    const userId2 = await createUser(
      'User2',
      'user2@example.com',
      'password123',
      '1234567890',
    )
    userIds.push(userId1, userId2)
    token = await authenticateUser()

    meetingId = await createMeeting(token, meetingDate)

    await createAttendance(token, userIds, meetingId)
  })

  it('should be able to find a meeting by its date', async () => {
    const response = await request(app)
      .get(`/meetings/by-date?date=${meetingDate.toISOString()}`)
      .set({ Authorization: `Bearer ${token}` })

    console.log(response.body)
  })
})
