/*
  Warnings:

  - Added the required column `flag` to the `course_announcements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "course_announcements" ADD COLUMN     "flag" INTEGER NOT NULL;
