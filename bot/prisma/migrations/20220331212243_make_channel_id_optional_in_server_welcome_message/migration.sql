/*
  Warnings:

  - A unique constraint covering the columns `[serverId,pattern]` on the table `AllowedLink` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[serverId,name]` on the table `Announcement` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[serverId,module,action]` on the table `AutoModRule` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,autoModRuleId]` on the table `AutoModRuleUser` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[word,serverId]` on the table `BannedWord` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[word,scoreId,serverId]` on the table `Keyword` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[roleId,commandId,serverId]` on the table `Permission` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,serverId]` on the table `Poll` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,pollId]` on the table `PollVote` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,serverId]` on the table `Score` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,serverId]` on the table `Scoreboard` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[discordId]` on the table `Server` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[serverId,roleId]` on the table `ServerAutoModIgnoredRole` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[serverId,isPublic]` on the table `ServerWelcomeMessage` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,serverId]` on the table `Stopwatch` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,serverId]` on the table `Timer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[discordId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,serverId]` on the table `UserServer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_ScoreToScoreboard` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "AllowedLink_serverId_pattern_key";

-- DropIndex
DROP INDEX "Announcement_serverId_name_key";

-- DropIndex
DROP INDEX "AutoModRule_serverId_module_action_key";

-- DropIndex
DROP INDEX "AutoModRuleUser_userId_autoModRuleId_key";

-- DropIndex
DROP INDEX "BannedWord_word_serverId_key";

-- DropIndex
DROP INDEX "Keyword_word_scoreId_serverId_key";

-- DropIndex
DROP INDEX "Permission_roleId_commandId_serverId_key";

-- DropIndex
DROP INDEX "Poll_name_serverId_key";

-- DropIndex
DROP INDEX "PollVote_userId_pollId_key";

-- DropIndex
DROP INDEX "Score_name_serverId_key";

-- DropIndex
DROP INDEX "Scoreboard_name_serverId_key";

-- DropIndex
DROP INDEX "Server_discordId_key";

-- DropIndex
DROP INDEX "ServerAutoModIgnoredRole_serverId_roleId_key";

-- DropIndex
DROP INDEX "ServerWelcomeMessage_serverId_isPublic_key";

-- DropIndex
DROP INDEX "Stopwatch_name_serverId_key";

-- DropIndex
DROP INDEX "Timer_name_serverId_key";

-- DropIndex
DROP INDEX "User_discordId_key";

-- DropIndex
DROP INDEX "UserServer_userId_serverId_key";

-- DropIndex
DROP INDEX "_ScoreToScoreboard_AB_unique";

-- DropIndex
DROP INDEX "_ScoreToScoreboard_B_index";

-- AlterTable
ALTER TABLE "ServerWelcomeMessage" ALTER COLUMN "channelId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AllowedLink_serverId_pattern_key" ON "AllowedLink"("serverId", "pattern");

-- CreateIndex
CREATE UNIQUE INDEX "Announcement_serverId_name_key" ON "Announcement"("serverId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "AutoModRule_serverId_module_action_key" ON "AutoModRule"("serverId", "module", "action");

-- CreateIndex
CREATE UNIQUE INDEX "AutoModRuleUser_userId_autoModRuleId_key" ON "AutoModRuleUser"("userId", "autoModRuleId");

-- CreateIndex
CREATE UNIQUE INDEX "BannedWord_word_serverId_key" ON "BannedWord"("word", "serverId");

-- CreateIndex
CREATE UNIQUE INDEX "Keyword_word_scoreId_serverId_key" ON "Keyword"("word", "scoreId", "serverId");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_roleId_commandId_serverId_key" ON "Permission"("roleId", "commandId", "serverId");

-- CreateIndex
CREATE UNIQUE INDEX "Poll_name_serverId_key" ON "Poll"("name", "serverId");

-- CreateIndex
CREATE UNIQUE INDEX "PollVote_userId_pollId_key" ON "PollVote"("userId", "pollId");

-- CreateIndex
CREATE UNIQUE INDEX "Score_name_serverId_key" ON "Score"("name", "serverId");

-- CreateIndex
CREATE UNIQUE INDEX "Scoreboard_name_serverId_key" ON "Scoreboard"("name", "serverId");

-- CreateIndex
CREATE UNIQUE INDEX "Server_discordId_key" ON "Server"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "ServerAutoModIgnoredRole_serverId_roleId_key" ON "ServerAutoModIgnoredRole"("serverId", "roleId");

-- CreateIndex
CREATE UNIQUE INDEX "ServerWelcomeMessage_serverId_isPublic_key" ON "ServerWelcomeMessage"("serverId", "isPublic");

-- CreateIndex
CREATE UNIQUE INDEX "Stopwatch_name_serverId_key" ON "Stopwatch"("name", "serverId");

-- CreateIndex
CREATE UNIQUE INDEX "Timer_name_serverId_key" ON "Timer"("name", "serverId");

-- CreateIndex
CREATE UNIQUE INDEX "User_discordId_key" ON "User"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "UserServer_userId_serverId_key" ON "UserServer"("userId", "serverId");

-- CreateIndex
CREATE UNIQUE INDEX "_ScoreToScoreboard_AB_unique" ON "_ScoreToScoreboard"("A", "B");

-- CreateIndex
CREATE INDEX "_ScoreToScoreboard_B_index" ON "_ScoreToScoreboard"("B");
