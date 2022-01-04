/*
  Warnings:

  - A unique constraint covering the columns `[roleId,commandId,serverId]` on the table `Permission` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,serverId]` on the table `Score` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,serverId]` on the table `Scoreboard` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[discordId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_ScoreToScoreboard` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "KeywordAction" AS ENUM ('UP', 'DOWN');

-- DropIndex
DROP INDEX "Permission_roleId_commandId_serverId_key";

-- DropIndex
DROP INDEX "Score_name_serverId_key";

-- DropIndex
DROP INDEX "Scoreboard_name_serverId_key";

-- DropIndex
DROP INDEX "User_discordId_key";

-- DropIndex
DROP INDEX "_ScoreToScoreboard_AB_unique";

-- DropIndex
DROP INDEX "_ScoreToScoreboard_B_index";

-- CreateTable
CREATE TABLE "Keyword" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "scoreId" TEXT NOT NULL,
    "action" "KeywordAction" NOT NULL DEFAULT E'UP',
    "amount" INTEGER NOT NULL DEFAULT 1,
    "channelId" TEXT,
    "userId" TEXT,

    CONSTRAINT "Keyword_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Permission_roleId_commandId_serverId_key" ON "Permission"("roleId", "commandId", "serverId");

-- CreateIndex
CREATE UNIQUE INDEX "Score_name_serverId_key" ON "Score"("name", "serverId");

-- CreateIndex
CREATE UNIQUE INDEX "Scoreboard_name_serverId_key" ON "Scoreboard"("name", "serverId");

-- CreateIndex
CREATE UNIQUE INDEX "User_discordId_key" ON "User"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "_ScoreToScoreboard_AB_unique" ON "_ScoreToScoreboard"("A", "B");

-- CreateIndex
CREATE INDEX "_ScoreToScoreboard_B_index" ON "_ScoreToScoreboard"("B");

-- AddForeignKey
ALTER TABLE "Keyword" ADD CONSTRAINT "Keyword_scoreId_fkey" FOREIGN KEY ("scoreId") REFERENCES "Score"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Keyword" ADD CONSTRAINT "Keyword_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
