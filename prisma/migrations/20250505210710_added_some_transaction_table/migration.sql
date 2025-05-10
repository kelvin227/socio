/*
  Warnings:

  - You are about to drop the column `transactionId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `transactionType` on the `Transaction` table. All the data in the column will be lost.
  - The `emailVerified` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[transactionHash]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[orderId]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Transaction_transactionId_key";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "transactionId",
DROP COLUMN "transactionType";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailVerifiedAt" TIMESTAMP(3),
ADD COLUMN     "kycverified" BOOLEAN DEFAULT false,
ADD COLUMN     "kycverifiedAt" TIMESTAMP(3),
DROP COLUMN "emailVerified",
ADD COLUMN     "emailVerified" BOOLEAN;

-- CreateTable
CREATE TABLE "ads" (
    "id" TEXT NOT NULL,
    "coin" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "minQty" INTEGER NOT NULL,
    "maxQty" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adsTransaction" (
    "id" TEXT NOT NULL,
    "coin" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "adsTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_transactionHash_key" ON "Transaction"("transactionHash");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_orderId_key" ON "Transaction"("orderId");

-- AddForeignKey
ALTER TABLE "ads" ADD CONSTRAINT "ads_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adsTransaction" ADD CONSTRAINT "adsTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
