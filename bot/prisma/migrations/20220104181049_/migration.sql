/*
  Warnings:

  - A unique constraint covering the columns `[keyword,scoreId,serverId]` on the table `Keyword` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[roleId,commandId,serverId]` on the table `Permission` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,serverId]` on the table `Score` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,serverId]` on the table `Scoreboard` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[discordId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_ScoreToScoreboard` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Keyword" DROP CONSTRAINT "Keyword_scoreId_fkey";

-- DropIndex
DROP INDEX "Keyword_keyword_scoreId_serverId_key";

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

-- CreateIndex
CREATE UNIQUE INDEX "Keyword_keyword_scoreId_serverId_key" ON "Keyword"("keyword", "scoreId", "serverId");

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
ALTER TABLE "Keyword" ADD CONSTRAINT "Keyword_scoreId_fkey" FOREIGN KEY ("scoreId") REFERENCES "Score"("id") ON DELETE CASCADE ON UPDATE CASCADE;
