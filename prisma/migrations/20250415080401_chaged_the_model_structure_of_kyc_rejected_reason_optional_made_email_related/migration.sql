/*
  Warnings:

  - You are about to drop the column `user_id` on the `Kyc` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Kyc" DROP CONSTRAINT "Kyc_user_id_fkey";

-- AlterTable
ALTER TABLE "Kyc" DROP COLUMN "user_id",
ALTER COLUMN "Rejection_reason" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Kyc" ADD CONSTRAINT "Kyc_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;
