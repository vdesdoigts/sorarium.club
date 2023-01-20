/*
  Warnings:

  - You are about to drop the column `teamId` on the `NbaPlayer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "NbaPlayer" DROP CONSTRAINT "NbaPlayer_teamId_fkey";

-- AlterTable
ALTER TABLE "NbaPlayer" DROP COLUMN "teamId",
ADD COLUMN     "jerseyNumber" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "NbaSorareCard" ADD COLUMN     "specialSerialNumber" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "NbaPlayerTeam" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "season" INTEGER NOT NULL,
    "playerId" TEXT NOT NULL,

    CONSTRAINT "NbaPlayerTeam_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NbaPlayerTeam" ADD CONSTRAINT "NbaPlayerTeam_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "NbaTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NbaPlayerTeam" ADD CONSTRAINT "NbaPlayerTeam_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "NbaPlayer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
