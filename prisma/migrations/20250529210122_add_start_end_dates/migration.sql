/*
  Warnings:

  - Added the required column `periodEnd` to the `Currency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `periodStart` to the `Currency` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Currency" ADD COLUMN     "periodEnd" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "periodStart" TIMESTAMP(3) NOT NULL;
