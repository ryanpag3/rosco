/*
  Warnings:

  - A unique constraint covering the columns `[name,serverId]` on the table `Score` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[discordId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `color` to the `Score` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Score_name_serverId_key";

-- DropIndex
DROP INDEX "User_discordId_key";

-- AlterTable
ALTER TABLE "Score" ADD COLUMN     "color" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Score_name_serverId_key" ON "Score"("name", "serverId");

-- CreateIndex
CREATE UNIQUE INDEX "User_discordId_key" ON "User"("discordId");
