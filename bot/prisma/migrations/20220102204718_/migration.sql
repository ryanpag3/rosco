/*
  Warnings:

  - You are about to drop the column `scoreboardId` on the `Score` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,serverId]` on the table `Score` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[discordId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Score" DROP CONSTRAINT "Score_scoreboardId_fkey";

-- DropIndex
DROP INDEX "Score_name_serverId_key";

-- DropIndex
DROP INDEX "User_discordId_key";

-- AlterTable
ALTER TABLE "Score" DROP COLUMN "scoreboardId";

-- CreateTable
CREATE TABLE "_ScoreToScoreboard" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ScoreToScoreboard_AB_unique" ON "_ScoreToScoreboard"("A", "B");

-- CreateIndex
CREATE INDEX "_ScoreToScoreboard_B_index" ON "_ScoreToScoreboard"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Score_name_serverId_key" ON "Score"("name", "serverId");

-- CreateIndex
CREATE UNIQUE INDEX "User_discordId_key" ON "User"("discordId");

-- AddForeignKey
ALTER TABLE "_ScoreToScoreboard" ADD FOREIGN KEY ("A") REFERENCES "Score"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ScoreToScoreboard" ADD FOREIGN KEY ("B") REFERENCES "Scoreboard"("id") ON DELETE CASCADE ON UPDATE CASCADE;
