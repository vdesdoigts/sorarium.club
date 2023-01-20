/*
  Warnings:

  - A unique constraint covering the columns `[nbaId]` on the table `Player` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nbaId]` on the table `Team` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Player_nbaId_key" ON "Player"("nbaId");

-- CreateIndex
CREATE UNIQUE INDEX "Team_nbaId_key" ON "Team"("nbaId");
