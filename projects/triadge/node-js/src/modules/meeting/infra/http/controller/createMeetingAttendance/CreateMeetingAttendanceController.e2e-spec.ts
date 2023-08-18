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

describe('[E2E] = Create Meeting', () => {
  beforeAll(async () => {
    await request(app).post('/users').send({
      name: 'Jonh Due',
      email: 'johndue@example.com',
      password: 'hash123',
      phoneNumber: '51999999999',
    });
  });

  it('should be able to create a new metting', async () => {
    const token = await authenticateUser();

    const response = await request(app)
      .post('/meeting')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        user_ids: ['id_of_user_1', 'id_of_user_2'],
        // attendance_id,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Meeting created');
  });
});
