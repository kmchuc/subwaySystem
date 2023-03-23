/*
  Warnings:

  - A unique constraint covering the columns `[trainId]` on the table `TrainLine` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TrainLine_trainId_key" ON "TrainLine"("trainId");
