import { authConfig } from '@config/auth';
import jwt from 'jsonwebtoken';
import request from 'supertest';

import { app } from '@shared/infra/http/start/app';

describe('[E2E] = Create Attendance', () => {
  beforeAll(async () => {
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

  it('should not be able to create a new attendance with an invalid token', async () => {
    const invalidToken = 'invalid_token';

    const response = await request(app)
      .post('/attendances')
      .set({
        Authorization: `Bearer ${invalidToken}`,
      })
      .send({
        date: new Date(),
        isPresent: true,
        user_id: 'some_id',
      });

    expect(response.status).toBe(401);
  });

  it('should not be able to create a new attendance for an unauthenticated user', async () => {
    const response = await request(app).post('/attendances').send({
      date: new Date(),
      isPresent: true,
      user_id: 'any-user-id',
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Token missing');
  });

  // it('should not be able to create a new attendance for a non-existent user', async () => {
  //   const responseToken = await request(app).post('/sessions').send({
  //     email: 'johndue@example.com',
  //     password: 'hash123',
  //   });

  //   const { token } = responseToken.body;

  //   const nonExistentUserId = 'non-existent-user-id';

  //   const response = await request(app)
  //     .post('/attendances')
  //     .set({
  //       Authorization: `Bearer ${token}`,
  //     })
  //     .send({
  //       date: new Date(),
  //       isPresent: true,
  //       user_id: nonExistentUserId,
  //     });

  //   expect(response.status).toBe(400);
  //   expect(response.body).toHaveProperty('message');
  //   expect(response.body.message).toBe('Users not found');
  // });
});
