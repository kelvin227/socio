/*
  Warnings:

  - Added the required column `coin` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fee` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qty` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "coin" TEXT NOT NULL,
ADD COLUMN     "fee" TEXT NOT NULL,
ADD COLUMN     "orderId" TEXT NOT NULL,
ADD COLUMN     "price" TEXT NOT NULL,
ADD COLUMN     "qty" INTEGER NOT NULL;
