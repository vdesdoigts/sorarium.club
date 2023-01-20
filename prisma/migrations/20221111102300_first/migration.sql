-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "nbaId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tricode" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "nbaId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "sorareSlug" TEXT NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
