/*
  Warnings:

  - You are about to drop the column `trainLineId` on the `Station` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Station" DROP CONSTRAINT "Station_trainLineId_fkey";

-- AlterTable
ALTER TABLE "Station" DROP COLUMN "trainLineId";

-- CreateTable
CREATE TABLE "_StationToTrainLine" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_StationToTrainLine_AB_unique" ON "_StationToTrainLine"("A", "B");

-- CreateIndex
CREATE INDEX "_StationToTrainLine_B_index" ON "_StationToTrainLine"("B");

-- AddForeignKey
ALTER TABLE "_StationToTrainLine" ADD CONSTRAINT "_StationToTrainLine_A_fkey" FOREIGN KEY ("A") REFERENCES "Station"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StationToTrainLine" ADD CONSTRAINT "_StationToTrainLine_B_fkey" FOREIGN KEY ("B") REFERENCES "TrainLine"("id") ON DELETE CASCADE ON UPDATE CASCADE;
