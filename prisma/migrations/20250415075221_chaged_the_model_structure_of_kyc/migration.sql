/*
  Warnings:

  - You are about to drop the column `documentURL` on the `Kyc` table. All the data in the column will be lost.
  - Added the required column `documentURL1` to the `Kyc` table without a default value. This is not possible if the table is not empty.
  - Added the required column `documentURL2` to the `Kyc` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Kyc" DROP COLUMN "documentURL",
ADD COLUMN     "documentURL1" TEXT NOT NULL,
ADD COLUMN     "documentURL2" TEXT NOT NULL;
