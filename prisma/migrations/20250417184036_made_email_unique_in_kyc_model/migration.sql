/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `userWallet` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "userWallet_email_key" ON "userWallet"("email");
