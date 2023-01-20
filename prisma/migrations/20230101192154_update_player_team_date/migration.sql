/*
  Warnings:

  - You are about to drop the column `season` on the `NbaPlayerTeam` table. All the data in the column will be lost.
  - Added the required column `date` to the `NbaPlayerTeam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NbaPlayerTeam" DROP COLUMN "season",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
