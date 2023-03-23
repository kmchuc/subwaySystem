/*
  Warnings:

  - Made the column `trainLineId` on table `Station` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Station" DROP CONSTRAINT "Station_trainLineId_fkey";

-- AlterTable
ALTER TABLE "Station" ALTER COLUMN "trainLineId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Station" ADD CONSTRAINT "Station_trainLineId_fkey" FOREIGN KEY ("trainLineId") REFERENCES "TrainLine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
