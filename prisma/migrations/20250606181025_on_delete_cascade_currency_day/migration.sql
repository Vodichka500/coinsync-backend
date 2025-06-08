-- DropForeignKey
ALTER TABLE "CurrencyDay" DROP CONSTRAINT "CurrencyDay_currencyId_fkey";

-- AddForeignKey
ALTER TABLE "CurrencyDay" ADD CONSTRAINT "CurrencyDay_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE CASCADE ON UPDATE CASCADE;
