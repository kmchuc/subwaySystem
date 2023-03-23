/*
  Warnings:

  - You are about to drop the column `trainId` on the `Station` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Station" DROP CONSTRAINT "Station_trainId_fkey";

-- DropForeignKey
ALTER TABLE "Station" DROP CONSTRAINT "Station_trainLineId_fkey";

-- AlterTable
ALTER TABLE "Station" DROP COLUMN "trainId",
ALTER COLUMN "trainLineId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Station" ADD CONSTRAINT "Station_trainLineId_fkey" FOREIGN KEY ("trainLineId") REFERENCES "TrainLine"("id") ON DELETE SET NULL ON UPDATE CASCADE;
