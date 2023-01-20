-- CreateTable
CREATE TABLE "Gallery" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Gallery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GalleryCard" (
    "id" TEXT NOT NULL,
    "galleryId" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,

    CONSTRAINT "GalleryCard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GalleryCard" ADD CONSTRAINT "GalleryCard_galleryId_fkey" FOREIGN KEY ("galleryId") REFERENCES "Gallery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GalleryCard" ADD CONSTRAINT "GalleryCard_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "NbaSorareCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
