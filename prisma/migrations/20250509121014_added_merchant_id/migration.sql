/*
  Warnings:

  - Added the required column `merchantID` to the `adsTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "adsTransaction" ADD COLUMN     "merchantID" TEXT NOT NULL;
