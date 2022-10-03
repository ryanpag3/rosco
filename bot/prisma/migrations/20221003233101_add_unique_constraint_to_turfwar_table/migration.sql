/*
  Warnings:

  - A unique constraint covering the columns `[x,y]` on the table `TurfwarPlot` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TurfwarPlot_x_y_key" ON "TurfwarPlot"("x", "y");
