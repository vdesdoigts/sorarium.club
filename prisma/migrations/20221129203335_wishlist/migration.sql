/*
  Warnings:

  - You are about to drop the `GalleryCard` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `serialNumber` to the `NbaSorareCard` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GalleryCard" DROP CONSTRAINT "GalleryCard_cardId_fkey";

-- DropForeignKey
ALTER TABLE "GalleryCard" DROP CONSTRAINT "GalleryCard_galleryId_fkey";

-- AlterTable
ALTER TABLE "NbaSorareCard" ADD COLUMN     "serialNumber" INTEGER NOT NULL;

-- DropTable
DROP TABLE "GalleryCard";

-- CreateTable
CREATE TABLE "NbaGalleryCard" (
    "id" TEXT NOT NULL,
    "galleryId" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "NbaGalleryCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NbaWishlist" (
    "id" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "NbaWishlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NbaWishlistCard" (
    "id" TEXT NOT NULL,
    "wishlistId" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "NbaWishlistCard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NbaGalleryCard_galleryId_key" ON "NbaGalleryCard"("galleryId");

-- CreateIndex
CREATE UNIQUE INDEX "NbaWishlist_userId_key" ON "NbaWishlist"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "NbaWishlistCard_wishlistId_key" ON "NbaWishlistCard"("wishlistId");

-- AddForeignKey
ALTER TABLE "NbaGalleryCard" ADD CONSTRAINT "NbaGalleryCard_galleryId_fkey" FOREIGN KEY ("galleryId") REFERENCES "NbaGallery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NbaGalleryCard" ADD CONSTRAINT "NbaGalleryCard_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "NbaSorareCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NbaWishlist" ADD CONSTRAINT "NbaWishlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NbaWishlistCard" ADD CONSTRAINT "NbaWishlistCard_wishlistId_fkey" FOREIGN KEY ("wishlistId") REFERENCES "NbaWishlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NbaWishlistCard" ADD CONSTRAINT "NbaWishlistCard_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "NbaSorareCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
