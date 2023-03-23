/*
  Warnings:

  - Added the required column `destinationId` to the `Train` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originId` to the `Train` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Train" ADD COLUMN     "destinationId" INTEGER NOT NULL,
ADD COLUMN     "originId" INTEGER NOT NULL,
ADD COLUMN     "stationId" INTEGER;

-- AddForeignKey
ALTER TABLE "Train" ADD CONSTRAINT "Train_originId_fkey" FOREIGN KEY ("originId") REFERENCES "Station"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Train" ADD CONSTRAINT "Train_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Station"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Train" ADD CONSTRAINT "Train_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station"("id") ON DELETE SET NULL ON UPDATE CASCADE;
