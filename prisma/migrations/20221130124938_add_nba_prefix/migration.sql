/*
  Warnings:

  - You are about to drop the `Player` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Team` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_teamId_fkey";

-- DropForeignKey
ALTER TABLE "NbaSorareCard" DROP CONSTRAINT "NbaSorareCard_playerId_fkey";

-- DropTable
DROP TABLE "Player";

-- DropTable
DROP TABLE "Team";

-- CreateTable
CREATE TABLE "NbaTeam" (
    "id" TEXT NOT NULL,
    "nbaId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tricode" TEXT NOT NULL,

    CONSTRAINT "NbaTeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NbaPlayer" (
    "id" TEXT NOT NULL,
    "nbaId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "sorareSlug" TEXT NOT NULL,
    "fullName" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "NbaPlayer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NbaTeam_nbaId_key" ON "NbaTeam"("nbaId");

-- CreateIndex
CREATE UNIQUE INDEX "NbaPlayer_nbaId_key" ON "NbaPlayer"("nbaId");

-- CreateIndex
CREATE UNIQUE INDEX "NbaPlayer_sorareSlug_key" ON "NbaPlayer"("sorareSlug");

-- AddForeignKey
ALTER TABLE "NbaPlayer" ADD CONSTRAINT "NbaPlayer_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "NbaTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NbaSorareCard" ADD CONSTRAINT "NbaSorareCard_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "NbaPlayer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
