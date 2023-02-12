/*
  Warnings:

  - You are about to drop the column `lastUpdated` on the `Institute` table. All the data in the column will be lost.
  - You are about to drop the column `lastUpdated` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `lastUpdated` on the `User` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Institute` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Topic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Institute" DROP COLUMN "lastUpdated",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "lastUpdated",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Topic" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "lastUpdated",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
