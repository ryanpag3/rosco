-- CreateTable
CREATE TABLE "ServerManagerRole" (
    "id" TEXT NOT NULL,
    "serverId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,

    CONSTRAINT "ServerManagerRole_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ServerManagerRole_serverId_roleId_key" ON "ServerManagerRole"("serverId", "roleId");

-- AddForeignKey
ALTER TABLE "ServerManagerRole" ADD CONSTRAINT "ServerManagerRole_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server"("id") ON DELETE CASCADE ON UPDATE CASCADE;
