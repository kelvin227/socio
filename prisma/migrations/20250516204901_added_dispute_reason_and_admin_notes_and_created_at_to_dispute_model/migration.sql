/*
  Warnings:

  - Added the required column `dispute_reason` to the `dispute` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "dispute" ADD COLUMN     "admin_notes" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dispute_reason" TEXT NOT NULL;
