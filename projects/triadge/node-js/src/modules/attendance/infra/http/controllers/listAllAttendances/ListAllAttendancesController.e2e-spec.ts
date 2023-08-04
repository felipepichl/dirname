import { authConfig } from '@config/auth';
import jwt from 'jsonwebtoken';
import request from 'supertest';

import { app } from '@shared/infra/http/start/app';

async function authenticateUser() {
  const response = await request(app).post('/sessions').send({
    email: 'johndue@example.com',
    password: 'hash123',
  });
  const { token } = response.body;
  return token;
}

describe('[E2E] = List all Attendance', () => {
  beforeAll(async () => {
    await request(app).post('/users').send({
      name: 'Jonh Due',
      email: 'johndue@example.com',
      password: 'hash123',
      phoneNumber: '51999999999',
    });
  });

  it('should be able to list all attendance', async () => {
    const token = await authenticateUser();
    const { sub: user_id } = jwt.verify(token, authConfig.secret_token);

    const response = await request(app)
      .post('/attendances')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        date: new Date(),
        isPresent: true,
        user_id,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Attendance created');
  });
});
