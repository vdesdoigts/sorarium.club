/*
  Warnings:

  - A unique constraint covering the columns `[sorareSlug]` on the table `Player` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Player_sorareSlug_key" ON "Player"("sorareSlug");
