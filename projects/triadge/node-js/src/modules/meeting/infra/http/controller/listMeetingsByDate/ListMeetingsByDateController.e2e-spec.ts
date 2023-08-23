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

describe('[E2E] = List Meeting by date', () => {
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

    await request(app).post('/users').send({
      name: 'User 3',
      email: 'user3@example.com',
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
    const { _id: userId3 } = userResponse.body.users[3]

    await request(app)
      .post('/attendances')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        date: new Date(2023, 3, 16),
        isPresent: true,
      })

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

    const { _id: attendanceId1 } = attendanceResponse.body[0]
    const { _id: attendanceId2 } = attendanceResponse.body[1]

    await request(app)
      .post('/meeting')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        userIds: [userId1, userId2],
        attendanceId: attendanceId1,
      })

    await request(app)
      .post('/meeting')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        userIds: [userId3],
        attendanceId: attendanceId2,
      })

    /*
      GET Method
    */

    const meetingResponse = await request(app)
      .get('/meeting')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        date: new Date(2023, 3, 16),
      })

    const meetings = meetingResponse.body.meetingsAttendances

    // console.log(meetingResponse.body.meetingsAttendances[0])
    // console.log(meetingResponse.body.meetingsAttendances[1])
    // console.log(meetings[0])

    expect(meetings).toHaveLength(2)

    const meeting = meetings[0]

    expect(meeting.userIds).toEqual(expect.arrayContaining([userId1, userId2]))
    expect(meeting.attendanceId).toBe(attendanceId1)
    expect(meetings).not.toEqual(expect.arrayContaining([userId3]))
  })
})
