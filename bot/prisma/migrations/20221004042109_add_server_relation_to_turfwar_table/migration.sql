/*
  Warnings:

  - Added the required column `serverId` to the `TurfwarPlot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TurfwarPlot" ADD COLUMN     "serverId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "TurfwarPlot" ADD CONSTRAINT "TurfwarPlot_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server"("id") ON DELETE CASCADE ON UPDATE CASCADE;
