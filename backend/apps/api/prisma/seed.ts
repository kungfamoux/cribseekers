import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Refusing to run seed script in production');
  }

  // Sprint 1 intentionally seeds no domain data. Future modules can register
  // deterministic seed routines here after their schemas are implemented.
  console.info('Database seed infrastructure ready. No seed data configured.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

