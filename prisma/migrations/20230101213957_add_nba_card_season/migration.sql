/*
  Warnings:

  - Added the required column `season` to the `NbaSorareCard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NbaSorareCard" ADD COLUMN     "season" TEXT NOT NULL;
