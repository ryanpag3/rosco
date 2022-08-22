-- AlterTable
ALTER TABLE "Keyword" ALTER COLUMN "name" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email" TEXT,
ADD COLUMN     "refreshToken" TEXT;
