-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "CurrencyType" AS ENUM ('CRYPTO', 'FIAT');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Currency" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "type" "CurrencyType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CurrencyDay" (
    "id" SERIAL NOT NULL,
    "currencyId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CurrencyDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CurrencyPairComparison" (
    "id" SERIAL NOT NULL,
    "currencyAId" INTEGER NOT NULL,
    "currencyBId" INTEGER NOT NULL,
    "periodStart" TIMESTAMP(3) NOT NULL,
    "periodEnd" TIMESTAMP(3) NOT NULL,
    "averageRatio" DOUBLE PRECISION,
    "maxRatio" DOUBLE PRECISION,
    "minRatio" DOUBLE PRECISION,
    "volatility" DOUBLE PRECISION,
    "priceChangeA" DOUBLE PRECISION,
    "priceChangeB" DOUBLE PRECISION,
    "recommendation" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CurrencyPairComparison_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CurrencyDay_currencyId_date_key" ON "CurrencyDay"("currencyId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "CurrencyPairComparison_currencyAId_currencyBId_periodStart__key" ON "CurrencyPairComparison"("currencyAId", "currencyBId", "periodStart", "periodEnd");

-- AddForeignKey
ALTER TABLE "CurrencyDay" ADD CONSTRAINT "CurrencyDay_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurrencyPairComparison" ADD CONSTRAINT "CurrencyPairComparison_currencyAId_fkey" FOREIGN KEY ("currencyAId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurrencyPairComparison" ADD CONSTRAINT "CurrencyPairComparison_currencyBId_fkey" FOREIGN KEY ("currencyBId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
