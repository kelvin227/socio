/*
  Warnings:

  - You are about to drop the column `email` on the `Kyc` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `userWallet` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userid]` on the table `Kyc` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userid]` on the table `userWallet` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userid` to the `Kyc` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userid` to the `userWallet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Kyc" DROP CONSTRAINT "Kyc_email_fkey";

-- DropForeignKey
ALTER TABLE "userWallet" DROP CONSTRAINT "userWallet_email_fkey";

-- DropIndex
DROP INDEX "Kyc_email_key";

-- DropIndex
DROP INDEX "userWallet_email_key";

-- AlterTable
ALTER TABLE "Kyc" DROP COLUMN "email",
ADD COLUMN     "userid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "userWallet" DROP COLUMN "email",
ADD COLUMN     "userid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Kyc_userid_key" ON "Kyc"("userid");

-- CreateIndex
CREATE UNIQUE INDEX "userWallet_userid_key" ON "userWallet"("userid");

-- AddForeignKey
ALTER TABLE "Kyc" ADD CONSTRAINT "Kyc_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userWallet" ADD CONSTRAINT "userWallet_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
