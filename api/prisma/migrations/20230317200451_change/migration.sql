-- DropForeignKey
ALTER TABLE "Station" DROP CONSTRAINT "Station_trainLineId_fkey";

-- AlterTable
ALTER TABLE "Station" ALTER COLUMN "trainLineId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Station" ADD CONSTRAINT "Station_trainLineId_fkey" FOREIGN KEY ("trainLineId") REFERENCES "TrainLine"("id") ON DELETE SET NULL ON UPDATE CASCADE;
