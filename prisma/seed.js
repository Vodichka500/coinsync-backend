"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../generated/prisma");
const prisma = new prisma_1.PrismaClient();
async function seed() {
    await prisma.user.deleteMany({});
    await prisma.currencyPairComparison.deleteMany({});
    await prisma.currency.deleteMany({});
    await prisma.currencyDay.deleteMany({});
    await prisma.user.createMany({
        data: [
            {
                email: 'admin-email@email.com',
                password: '$2b$10$RFU7CucfTD3ZC4jP/QgjDu7qztINcS0ppxos.yAoDmZlU0KEgBHee',
                role: 'ADMIN',
            },
            {
                email: 'user-email@emial.com',
                password: '$2b$10$RFU7CucfTD3ZC4jP/QgjDu7qztINcS0ppxos.yAoDmZlU0KEgBHee',
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
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=seed.js.map