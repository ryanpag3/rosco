/*
  Warnings:

  - Added the required column `setName` to the `MagicTheGatheringCard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MagicTheGatheringCard" ADD COLUMN     "setName" TEXT NOT NULL;
