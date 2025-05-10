/*
  Warnings:

  - Added the required column `adId` to the `adsTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `adsTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "adsTransaction" ADD COLUMN     "adId" TEXT NOT NULL,
ADD COLUMN     "orderId" TEXT NOT NULL;
