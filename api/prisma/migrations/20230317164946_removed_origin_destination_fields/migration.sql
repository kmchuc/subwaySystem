/*
  Warnings:

  - You are about to drop the column `destinationId` on the `Train` table. All the data in the column will be lost.
  - You are about to drop the column `originId` on the `Train` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Train" DROP CONSTRAINT "Train_destinationId_fkey";

-- DropForeignKey
ALTER TABLE "Train" DROP CONSTRAINT "Train_originId_fkey";

-- AlterTable
ALTER TABLE "Train" DROP COLUMN "destinationId",
DROP COLUMN "originId";
