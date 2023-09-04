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

  beforeAll(async () => {
    await createUser()
    token = await authenticateUser()
  })

  it('should be able to find a meeting by its date', async () => {
    const meetingDate = new Date(2022, 3, 16)
    await createMeeting(token, meetingDate)

    const response = await request(app)
      .get(`/meetings/by-date?date=${meetingDate.toISOString()}`)
      .set({ Authorization: `Bearer ${token}` })

    const { date } = response.body

    expect(response.status).toBe(200)
    expect(new Date(date)).toEqual(meetingDate)
  })

  it('should return 404 when no meeting is found for the specified date', async () => {
    const nonExistentDate = new Date(2025, 5, 20)

    const response = await request(app)
      .get(`/meetings/by-date?date=${nonExistentDate.toISOString()}`)
      .set({ Authorization: `Bearer ${token}` })

    expect(response.status).toBe(404)
  })
})
