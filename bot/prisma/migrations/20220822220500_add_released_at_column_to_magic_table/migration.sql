/*
  Warnings:

  - Added the required column `releasedAt` to the `MagicTheGatheringCard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MagicTheGatheringCard" ADD COLUMN     "releasedAt" TIMESTAMP(3) NOT NULL;
