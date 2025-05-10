/*
  Warnings:

  - A unique constraint covering the columns `[orderId]` on the table `adsTransaction` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "adsTransaction" ADD COLUMN     "customerconfirm" TEXT NOT NULL DEFAULT 'pending',
ADD COLUMN     "merchantconfirm" TEXT NOT NULL DEFAULT 'pending';

-- CreateIndex
CREATE UNIQUE INDEX "adsTransaction_orderId_key" ON "adsTransaction"("orderId");
