/*
  Warnings:

  - A unique constraint covering the columns `[name,serverId]` on the table `Score` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[discordId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Score_name_serverId_key";

-- DropIndex
DROP INDEX "User_discordId_key";

-- AlterTable
ALTER TABLE "Score" ADD COLUMN     "scoreboardId" TEXT;

-- CreateTable
CREATE TABLE "Scoreboard" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "serverId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Scoreboard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Score_name_serverId_key" ON "Score"("name", "serverId");

-- CreateIndex
CREATE UNIQUE INDEX "User_discordId_key" ON "User"("discordId");

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_scoreboardId_fkey" FOREIGN KEY ("scoreboardId") REFERENCES "Scoreboard"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scoreboard" ADD CONSTRAINT "Scoreboard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
