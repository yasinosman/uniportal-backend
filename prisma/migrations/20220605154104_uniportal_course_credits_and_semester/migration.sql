/*
  Warnings:

  - Added the required column `credit` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semester` to the `courses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "credit" INTEGER NOT NULL,
ADD COLUMN     "semester" TEXT NOT NULL;
