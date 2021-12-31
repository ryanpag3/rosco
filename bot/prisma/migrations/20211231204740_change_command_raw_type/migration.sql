/*
  Warnings:

  - The `commandRaw` column on the `CommandHistory` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "CommandHistory" DROP COLUMN "commandRaw",
ADD COLUMN     "commandRaw" JSONB;
