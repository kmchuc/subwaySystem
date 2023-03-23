/*
  Warnings:

  - You are about to drop the column `stationId` on the `Train` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Train" DROP CONSTRAINT "Train_stationId_fkey";

-- DropIndex
DROP INDEX "TrainLine_trainId_key";

-- AlterTable
ALTER TABLE "Train" DROP COLUMN "stationId";
