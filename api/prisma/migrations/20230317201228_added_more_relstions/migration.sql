/*
  Warnings:

  - Added the required column `trainId` to the `Station` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Station" ADD COLUMN     "trainId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Station" ADD CONSTRAINT "Station_trainId_fkey" FOREIGN KEY ("trainId") REFERENCES "Train"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
