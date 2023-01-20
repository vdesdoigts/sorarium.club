-- CreateTable
CREATE TABLE "NbaSorareCard" (
    "id" TEXT NOT NULL,
    "sorareId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "rarity" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "NbaSorareCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_NbaSorareCardToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "NbaSorareCard_sorareId_key" ON "NbaSorareCard"("sorareId");

-- CreateIndex
CREATE UNIQUE INDEX "_NbaSorareCardToUser_AB_unique" ON "_NbaSorareCardToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_NbaSorareCardToUser_B_index" ON "_NbaSorareCardToUser"("B");

-- AddForeignKey
ALTER TABLE "NbaSorareCard" ADD CONSTRAINT "NbaSorareCard_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NbaSorareCardToUser" ADD CONSTRAINT "_NbaSorareCardToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "NbaSorareCard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NbaSorareCardToUser" ADD CONSTRAINT "_NbaSorareCardToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
