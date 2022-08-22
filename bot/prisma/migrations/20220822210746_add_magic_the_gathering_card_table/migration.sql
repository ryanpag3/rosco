-- CreateTable
CREATE TABLE "MagicTheGatheringCard" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "card" JSONB NOT NULL,

    CONSTRAINT "MagicTheGatheringCard_pkey" PRIMARY KEY ("id")
);
