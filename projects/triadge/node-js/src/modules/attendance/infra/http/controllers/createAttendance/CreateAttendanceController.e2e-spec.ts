import request from 'supertest';

import { app } from '@shared/infra/http/start/app';

describe('[E2E] = Create Attendance', () => {
  beforeEach(async () => {
    await request(app).post('/users').send({
      name: 'Jonh Due',
      email: 'johndue@example.com',
      password: 'hash123',
      phoneNumber: '51999999999',
    });
  });

  it('should be able to create a new attendance', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'johndue@example.com',
      password: 'hash123',
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post('/attendances')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        data: new Date(),
        isPresent: true,
        user_id: 'user_not_found',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Attendance created');
  });
});
