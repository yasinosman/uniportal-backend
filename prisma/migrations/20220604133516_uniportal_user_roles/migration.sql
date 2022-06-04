-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'LECTURER');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT E'STUDENT';
