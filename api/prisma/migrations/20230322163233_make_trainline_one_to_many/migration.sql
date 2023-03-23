/*
  Warnings:

  - You are about to drop the `_StationToTrainLine` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_StationToTrainLine" DROP CONSTRAINT "_StationToTrainLine_A_fkey";

-- DropForeignKey
ALTER TABLE "_StationToTrainLine" DROP CONSTRAINT "_StationToTrainLine_B_fkey";

-- AlterTable
ALTER TABLE "Station" ADD COLUMN     "trainLineId" INTEGER;

-- DropTable
DROP TABLE "_StationToTrainLine";

-- AddForeignKey
ALTER TABLE "Station" ADD CONSTRAINT "Station_trainLineId_fkey" FOREIGN KEY ("trainLineId") REFERENCES "TrainLine"("id") ON DELETE SET NULL ON UPDATE CASCADE;
