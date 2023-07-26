import { hash } from 'bcrypt';
import request from 'supertest';

import { app } from '@shared/infra/http/start/app';
import { PrismaSingleton } from '@shared/infra/prisma';

describe('[E2E] = Authenticate User', () => {
  beforeEach(async () => {
    const passwordHash = await hash('hash123', 8);
    await PrismaSingleton.getInstance().user.create({
      data: {
        name: 'Jonh Due',
        email: 'johndue@example.com',
        password: passwordHash,
        phoneNumber: '51999999999',
      },
    });
  });

  it('should be able to authenticate an user', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'johndue@example.com',
      password: 'hash123',
    });

    expect(responseToken.status).toBe(200);
    expect(responseToken.body).toHaveProperty('token');
    expect(responseToken.body).toHaveProperty('refresh_token');
  });
});
