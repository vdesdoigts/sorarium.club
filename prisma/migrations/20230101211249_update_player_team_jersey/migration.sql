/*
  Warnings:

  - You are about to drop the column `jerseyNumber` on the `NbaPlayer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "NbaPlayer" DROP COLUMN "jerseyNumber";

-- AlterTable
ALTER TABLE "NbaPlayerTeam" ADD COLUMN     "jerseyNumber" INTEGER NOT NULL DEFAULT 0;
