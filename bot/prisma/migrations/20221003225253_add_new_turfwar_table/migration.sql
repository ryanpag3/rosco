-- CreateTable
CREATE TABLE "TurfwarPlot" (
    "id" TEXT NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "TurfwarPlot_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TurfwarPlot" ADD CONSTRAINT "TurfwarPlot_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
