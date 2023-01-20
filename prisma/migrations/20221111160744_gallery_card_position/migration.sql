/*
  Warnings:

  - Added the required column `position` to the `GalleryCard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GalleryCard" ADD COLUMN     "position" INTEGER NOT NULL;
