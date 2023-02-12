/*
  Warnings:

  - You are about to drop the column `instituteId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `rule` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_instituteId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "instituteId",
DROP COLUMN "rule",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
