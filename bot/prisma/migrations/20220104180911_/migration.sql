-- CreateEnum
CREATE TYPE "KeywordAction" AS ENUM ('UP', 'DOWN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "discordId" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "CommandHistory" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "commandName" TEXT NOT NULL,
    "commandRaw" TEXT,

    CONSTRAINT "CommandHistory_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "_ScoreToScoreboard" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_discordId_key" ON "User"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_roleId_commandId_serverId_key" ON "Permission"("roleId", "commandId", "serverId");

-- CreateIndex
CREATE UNIQUE INDEX "Score_name_serverId_key" ON "Score"("name", "serverId");

-- CreateIndex
CREATE UNIQUE INDEX "Scoreboard_name_serverId_key" ON "Scoreboard"("name", "serverId");

-- CreateIndex
CREATE UNIQUE INDEX "Keyword_keyword_scoreId_serverId_key" ON "Keyword"("keyword", "scoreId", "serverId");

-- CreateIndex
CREATE UNIQUE INDEX "_ScoreToScoreboard_AB_unique" ON "_ScoreToScoreboard"("A", "B");

-- CreateIndex
CREATE INDEX "_ScoreToScoreboard_B_index" ON "_ScoreToScoreboard"("B");

-- AddForeignKey
ALTER TABLE "Permission" ADD CONSTRAINT "Permission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommandHistory" ADD CONSTRAINT "CommandHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scoreboard" ADD CONSTRAINT "Scoreboard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Keyword" ADD CONSTRAINT "Keyword_scoreId_fkey" FOREIGN KEY ("scoreId") REFERENCES "Score"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Keyword" ADD CONSTRAINT "Keyword_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ScoreToScoreboard" ADD FOREIGN KEY ("A") REFERENCES "Score"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ScoreToScoreboard" ADD FOREIGN KEY ("B") REFERENCES "Scoreboard"("id") ON DELETE CASCADE ON UPDATE CASCADE;
