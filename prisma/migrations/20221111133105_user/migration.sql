-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "sorareId" TEXT NOT NULL,
    "sorareUsername" TEXT NOT NULL,
    "sorareToken" TEXT NOT NULL,
    "sorareRefreshToken" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_sorareId_key" ON "User"("sorareId");
