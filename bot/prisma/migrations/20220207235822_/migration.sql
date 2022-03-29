-- CreateEnum
CREATE TYPE "CurrencyAction" AS ENUM ('COMMAND', 'MESSAGE', 'REACTION');

-- CreateEnum
CREATE TYPE "KeywordAction" AS ENUM ('UP', 'DOWN');

-- CreateTable
CREATE TABLE "Announcement" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "createdById" TEXT,
    "serverId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "announceAt" TIMESTAMP(3) NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "Announcement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommandHistory" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "serverId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "commandName" TEXT NOT NULL,
    "commandRaw" TEXT,

    CONSTRAINT "CommandHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CurrencyHistoryLog" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "serverId" TEXT NOT NULL,
    "delta" INTEGER NOT NULL,
    "currencyRuleId" TEXT,
    "senderId" TEXT,
    "receiverId" TEXT NOT NULL,
    "reaction" TEXT,
    "messageId" TEXT,

    CONSTRAINT "CurrencyHistoryLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CurrencyRule" (
    "id" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "action" "CurrencyAction" NOT NULL,
    "serverId" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "CurrencyRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Keyword" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "keyword" TEXT NOT NULL,
    "scoreId" TEXT NOT NULL,
    "action" "KeywordAction" NOT NULL DEFAULT E'UP',
    "amount" INTEGER NOT NULL DEFAULT 1,
    "serverId" TEXT NOT NULL,
    "channelId" TEXT,
    "userId" TEXT,

    CONSTRAINT "Keyword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "commandId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "serverId" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Poll" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "serverId" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Poll_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PollOption" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pollId" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "PollOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PollVote" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pollId" TEXT NOT NULL,
    "pollOptionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "PollVote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Score" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "color" TEXT NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "serverId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scoreboard" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "serverId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Scoreboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Server" (
    "id" TEXT NOT NULL,
    "discordId" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "currencyHistoryChannelId" TEXT,
    "currencyHistoryChannelActive" BOOLEAN DEFAULT true,
    "currencyCount" INTEGER NOT NULL DEFAULT 0,
    "timezone" TEXT NOT NULL DEFAULT E'America/Los_Angeles',
    "autoModBannedWordsEnabled" BOOLEAN NOT NULL DEFAULT false,
    "announceEnabled" BOOLEAN NOT NULL DEFAULT true,
    "currencyEnabled" BOOLEAN NOT NULL DEFAULT true,
    "keywordEnabled" BOOLEAN NOT NULL DEFAULT true,
    "pollEnabled" BOOLEAN NOT NULL DEFAULT true,
    "scoreEnabled" BOOLEAN NOT NULL DEFAULT true,
    "scoreboardEnabled" BOOLEAN NOT NULL DEFAULT true,
    "stopwatchEnabled" BOOLEAN NOT NULL DEFAULT true,
    "timerEnabled" BOOLEAN NOT NULL DEFAULT true,
    "welcomeEnabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Server_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServerWelcomeMessage" (
    "id" TEXT NOT NULL,
    "serverId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL,
    "isEnabled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ServerWelcomeMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stopwatch" (
    "id" TEXT NOT NULL,
    "serverId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3),
    "stoppedAt" TIMESTAMP(3),
    "userId" TEXT,

    CONSTRAINT "Stopwatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Timer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "serverId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "createdById" TEXT,
    "message" TEXT,
    "expiresOn" TIMESTAMP(3),
    "pausedDuration" TEXT,

    CONSTRAINT "Timer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "discordId" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "botCurrencyCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserServer" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "serverId" TEXT NOT NULL,
    "currencyCount" INTEGER NOT NULL DEFAULT 0,
    "bankCurrencyCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UserServer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ScoreToScoreboard" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Announcement_serverId_name_key" ON "Announcement"("serverId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "CurrencyHistoryLog_receiverId_reaction_messageId_key" ON "CurrencyHistoryLog"("receiverId", "reaction", "messageId");

-- CreateIndex
CREATE UNIQUE INDEX "Keyword_keyword_scoreId_serverId_key" ON "Keyword"("keyword", "scoreId", "serverId");

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

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommandHistory" ADD CONSTRAINT "CommandHistory_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommandHistory" ADD CONSTRAINT "CommandHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurrencyHistoryLog" ADD CONSTRAINT "CurrencyHistoryLog_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurrencyHistoryLog" ADD CONSTRAINT "CurrencyHistoryLog_currencyRuleId_fkey" FOREIGN KEY ("currencyRuleId") REFERENCES "CurrencyRule"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurrencyHistoryLog" ADD CONSTRAINT "CurrencyHistoryLog_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurrencyHistoryLog" ADD CONSTRAINT "CurrencyHistoryLog_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurrencyRule" ADD CONSTRAINT "CurrencyRule_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurrencyRule" ADD CONSTRAINT "CurrencyRule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Keyword" ADD CONSTRAINT "Keyword_scoreId_fkey" FOREIGN KEY ("scoreId") REFERENCES "Score"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Keyword" ADD CONSTRAINT "Keyword_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Keyword" ADD CONSTRAINT "Keyword_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permission" ADD CONSTRAINT "Permission_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permission" ADD CONSTRAINT "Permission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Poll" ADD CONSTRAINT "Poll_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Poll" ADD CONSTRAINT "Poll_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PollOption" ADD CONSTRAINT "PollOption_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "Poll"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PollVote" ADD CONSTRAINT "PollVote_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "Poll"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PollVote" ADD CONSTRAINT "PollVote_pollOptionId_fkey" FOREIGN KEY ("pollOptionId") REFERENCES "PollOption"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PollVote" ADD CONSTRAINT "PollVote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scoreboard" ADD CONSTRAINT "Scoreboard_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scoreboard" ADD CONSTRAINT "Scoreboard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServerWelcomeMessage" ADD CONSTRAINT "ServerWelcomeMessage_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stopwatch" ADD CONSTRAINT "Stopwatch_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stopwatch" ADD CONSTRAINT "Stopwatch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timer" ADD CONSTRAINT "Timer_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timer" ADD CONSTRAINT "Timer_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserServer" ADD CONSTRAINT "UserServer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserServer" ADD CONSTRAINT "UserServer_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ScoreToScoreboard" ADD FOREIGN KEY ("A") REFERENCES "Score"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ScoreToScoreboard" ADD FOREIGN KEY ("B") REFERENCES "Scoreboard"("id") ON DELETE CASCADE ON UPDATE CASCADE;
