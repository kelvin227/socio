/*
  Warnings:

  - Made the column `encrypted_key` on table `wallets` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "wallets" ALTER COLUMN "encrypted_key" SET NOT NULL;
