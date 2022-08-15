/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Keyword` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Keyword" ADD COLUMN     "announceChannelId" TEXT,
ADD COLUMN     "name" TEXT NOT NULL DEFAULT gen_random_uuid();

-- CreateIndex
CREATE UNIQUE INDEX "Keyword_name_key" ON "Keyword"("name");