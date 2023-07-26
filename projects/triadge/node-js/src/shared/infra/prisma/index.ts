import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

class PrismaSingleton {
  private static instance: PrismaClient;

  private constructor() {
    // Prevent direct constructor calls with the `new` operator.
  }

  public static getInstance(): PrismaClient {
    if (!PrismaSingleton.instance) {
      PrismaSingleton.instance = new PrismaClient();
    }

    return PrismaSingleton.instance;
  }
}

function closePrismaConnection(): void {
  const prisma = PrismaSingleton.getInstance();
  if (prisma) {
    prisma.$disconnect();
  }
}

process.on('beforeExit', closePrismaConnection);
process.on('SIGINT', closePrismaConnection);
process.on('SIGTERM', closePrismaConnection);

export { PrismaSingleton as getPrismaClient, closePrismaConnection };
