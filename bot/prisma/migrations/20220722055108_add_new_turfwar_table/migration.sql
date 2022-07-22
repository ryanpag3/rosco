-- CreateTable
CREATE TABLE "TurfwarCoordinate" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "color" TEXT NOT NULL,
    "X" INTEGER NOT NULL,
    "Y" INTEGER NOT NULL,
    "createdById" TEXT,

    CONSTRAINT "TurfwarCoordinate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TurfwarCoordinate_X_Y_key" ON "TurfwarCoordinate"("X", "Y");

-- AddForeignKey
ALTER TABLE "TurfwarCoordinate" ADD CONSTRAINT "TurfwarCoordinate_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
