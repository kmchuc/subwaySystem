-- DropForeignKey
ALTER TABLE "Ride" DROP CONSTRAINT "Ride_exitStationId_fkey";

-- AlterTable
ALTER TABLE "Ride" ALTER COLUMN "exitStationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Ride" ADD CONSTRAINT "Ride_exitStationId_fkey" FOREIGN KEY ("exitStationId") REFERENCES "Station"("id") ON DELETE SET NULL ON UPDATE CASCADE;
