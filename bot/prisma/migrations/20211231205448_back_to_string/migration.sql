/*
  Warnings:

  - Made the column `commandRaw` on table `CommandHistory` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CommandHistory" ALTER COLUMN "commandRaw" SET NOT NULL,
ALTER COLUMN "commandRaw" SET DATA TYPE TEXT;
