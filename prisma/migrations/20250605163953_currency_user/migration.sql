/*
  Warnings:

  - Added the required column `userId` to the `CurrencyPairComparison` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CurrencyPairComparison" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "CurrencyPairComparison" ADD CONSTRAINT "CurrencyPairComparison_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
