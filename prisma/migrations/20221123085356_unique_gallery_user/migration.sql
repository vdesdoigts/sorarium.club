/*
  Warnings:

  - You are about to drop the `Gallery` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Gallery" DROP CONSTRAINT "Gallery_userId_fkey";

-- DropForeignKey
ALTER TABLE "GalleryCard" DROP CONSTRAINT "GalleryCard_galleryId_fkey";

-- DropTable
DROP TABLE "Gallery";

-- CreateTable
CREATE TABLE "NbaGallery" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "NbaGallery_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NbaGallery_userId_key" ON "NbaGallery"("userId");

-- AddForeignKey
ALTER TABLE "NbaGallery" ADD CONSTRAINT "NbaGallery_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GalleryCard" ADD CONSTRAINT "GalleryCard_galleryId_fkey" FOREIGN KEY ("galleryId") REFERENCES "NbaGallery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
