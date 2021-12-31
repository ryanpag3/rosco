-- CreateTable
CREATE TABLE "CommandHistory" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "commandName" TEXT NOT NULL,
    "commandRaw" TEXT NOT NULL,

    CONSTRAINT "CommandHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CommandHistory" ADD CONSTRAINT "CommandHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
