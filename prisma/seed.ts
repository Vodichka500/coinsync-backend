import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  // Clear existing data
  await prisma.user.deleteMany({});
  await prisma.currencyPairComparison.deleteMany({});
  await prisma.currency.deleteMany({});
  await prisma.currencyDay.deleteMany({});
  await prisma.user.createMany({
    data: [
      {
        email: 'admin-email@email.com',
        password:
          '$2b$10$RFU7CucfTD3ZC4jP/QgjDu7qztINcS0ppxos.yAoDmZlU0KEgBHee', // password: "password",
        role: 'ADMIN',
      },
      {
        email: 'user-email@emial.com',
        password:
          '$2b$10$RFU7CucfTD3ZC4jP/QgjDu7qztINcS0ppxos.yAoDmZlU0KEgBHee', // password: "password",
        role: 'USER',
      },
    ],
  });
}

seed()
  .then(() => {
    console.log('Seeding db completed successfully.');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(() => prisma.$disconnect());
