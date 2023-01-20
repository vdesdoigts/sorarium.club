-- DropForeignKey
ALTER TABLE "NbaCollection" DROP CONSTRAINT "NbaCollection_userId_fkey";

-- DropForeignKey
ALTER TABLE "NbaCollectionCard" DROP CONSTRAINT "NbaCollectionCard_cardId_fkey";

-- DropForeignKey
ALTER TABLE "NbaCollectionCard" DROP CONSTRAINT "NbaCollectionCard_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "NbaGallery" DROP CONSTRAINT "NbaGallery_userId_fkey";

-- DropForeignKey
ALTER TABLE "NbaGalleryCard" DROP CONSTRAINT "NbaGalleryCard_cardId_fkey";

-- DropForeignKey
ALTER TABLE "NbaGalleryCard" DROP CONSTRAINT "NbaGalleryCard_galleryId_fkey";

-- DropForeignKey
ALTER TABLE "NbaWishlist" DROP CONSTRAINT "NbaWishlist_userId_fkey";

-- DropForeignKey
ALTER TABLE "NbaWishlistCard" DROP CONSTRAINT "NbaWishlistCard_wishlistId_fkey";

-- AddForeignKey
ALTER TABLE "NbaGallery" ADD CONSTRAINT "NbaGallery_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NbaGalleryCard" ADD CONSTRAINT "NbaGalleryCard_galleryId_fkey" FOREIGN KEY ("galleryId") REFERENCES "NbaGallery"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NbaGalleryCard" ADD CONSTRAINT "NbaGalleryCard_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "NbaSorareCard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NbaWishlist" ADD CONSTRAINT "NbaWishlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NbaWishlistCard" ADD CONSTRAINT "NbaWishlistCard_wishlistId_fkey" FOREIGN KEY ("wishlistId") REFERENCES "NbaWishlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NbaCollection" ADD CONSTRAINT "NbaCollection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NbaCollectionCard" ADD CONSTRAINT "NbaCollectionCard_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "NbaCollection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NbaCollectionCard" ADD CONSTRAINT "NbaCollectionCard_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "NbaSorareCard"("id") ON DELETE CASCADE ON UPDATE CASCADE;
