/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Kyc` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Kyc_email_key" ON "Kyc"("email");
