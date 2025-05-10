/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `adsTransaction` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userName]` on the table `adsTransaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `adsTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `adsTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "adsTransaction" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "adsTransaction_userId_key" ON "adsTransaction"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "adsTransaction_userName_key" ON "adsTransaction"("userName");
