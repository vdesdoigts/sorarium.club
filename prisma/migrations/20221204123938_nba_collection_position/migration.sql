/*
  Warnings:

  - Added the required column `position` to the `NbaCollection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NbaCollection" ADD COLUMN     "position" INTEGER NOT NULL;
