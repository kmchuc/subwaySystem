-- AlterTable
ALTER TABLE "Station" ADD COLUMN     "trainLineId" INTEGER;

-- CreateTable
CREATE TABLE "Train" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Train_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainLine" (
    "id" SERIAL NOT NULL,
    "trainId" INTEGER NOT NULL,
    "stationId" INTEGER NOT NULL,

    CONSTRAINT "TrainLine_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Station" ADD CONSTRAINT "Station_trainLineId_fkey" FOREIGN KEY ("trainLineId") REFERENCES "TrainLine"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainLine" ADD CONSTRAINT "TrainLine_trainId_fkey" FOREIGN KEY ("trainId") REFERENCES "Train"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
