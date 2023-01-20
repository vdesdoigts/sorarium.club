-- CreateTable
CREATE TABLE "NbaCollection" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "NbaCollection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NbaCollectionCard" (
    "id" TEXT NOT NULL,
    "collectionId" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "NbaCollectionCard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NbaCollection_userId_key" ON "NbaCollection"("userId");

-- AddForeignKey
ALTER TABLE "NbaCollection" ADD CONSTRAINT "NbaCollection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NbaCollectionCard" ADD CONSTRAINT "NbaCollectionCard_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "NbaCollection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NbaCollectionCard" ADD CONSTRAINT "NbaCollectionCard_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "NbaSorareCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
