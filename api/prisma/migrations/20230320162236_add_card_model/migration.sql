/*
  Warnings:

  - A unique constraint covering the columns `[trainLineId]` on the table `Station` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[trainId]` on the table `TrainLine` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL DEFAULT 0,
    "amount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Card_number_key" ON "Card"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Station_trainLineId_key" ON "Station"("trainLineId");

-- CreateIndex
CREATE UNIQUE INDEX "TrainLine_trainId_key" ON "TrainLine"("trainId");
