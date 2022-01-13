/*
  Warnings:

  - A unique constraint covering the columns `[keyword,scoreId,serverId]` on the table `Keyword` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[roleId,commandId,serverId]` on the table `Permission` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,serverId]` on the table `Score` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,serverId]` on the table `Scoreboard` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[discordId]` on the table `Server` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,serverId]` on the table `Stopwatch` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[discordId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_ScoreToScoreboard` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `CurrencyHistoryLog` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Keyword_keyword_scoreId_serverId_key";

-- DropIndex
DROP INDEX "Permission_roleId_commandId_serverId_key";

-- DropIndex
DROP INDEX "Score_name_serverId_key";

-- DropIndex
DROP INDEX "Scoreboard_name_serverId_key";

-- DropIndex
DROP INDEX "Server_discordId_key";

-- DropIndex
DROP INDEX "Stopwatch_name_serverId_key";

-- DropIndex
DROP INDEX "User_discordId_key";

-- DropIndex
DROP INDEX "_ScoreToScoreboard_AB_unique";

-- DropIndex
DROP INDEX "_ScoreToScoreboard_B_index";

-- AlterTable
ALTER TABLE "CurrencyHistoryLog" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Keyword_keyword_scoreId_serverId_key" ON "Keyword"("keyword", "scoreId", "serverId");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_roleId_commandId_serverId_key" ON "Permission"("roleId", "commandId", "serverId");

-- CreateIndex
CREATE UNIQUE INDEX "Score_name_serverId_key" ON "Score"("name", "serverId");

-- CreateIndex
CREATE UNIQUE INDEX "Scoreboard_name_serverId_key" ON "Scoreboard"("name", "serverId");

-- CreateIndex
CREATE UNIQUE INDEX "Server_discordId_key" ON "Server"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "Stopwatch_name_serverId_key" ON "Stopwatch"("name", "serverId");

-- CreateIndex
CREATE UNIQUE INDEX "User_discordId_key" ON "User"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "_ScoreToScoreboard_AB_unique" ON "_ScoreToScoreboard"("A", "B");

-- CreateIndex
CREATE INDEX "_ScoreToScoreboard_B_index" ON "_ScoreToScoreboard"("B");
