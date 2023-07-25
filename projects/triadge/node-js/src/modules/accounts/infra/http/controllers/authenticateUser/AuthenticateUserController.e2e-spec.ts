import { hash } from 'bcrypt';
import request from 'supertest';

import { app } from '@shared/infra/http/start/app';
import { getPrismaClient } from '@shared/infra/prisma';

describe('[E2E] = Authenticate User', () => {
  beforeAll(async () => {
    const passwordHash = await hash('hash123', 8);

    await getPrismaClient().user.create({
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

    console.log(responseToken.body);

    expect(responseToken.status).toBe(200);
    expect(responseToken.body).toHaveProperty('token');
  });
});
