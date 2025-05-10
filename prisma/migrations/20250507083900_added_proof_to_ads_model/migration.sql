/*
  Warnings:

  - Added the required column `proof` to the `ads` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ads" ADD COLUMN     "proof" TEXT NOT NULL;
