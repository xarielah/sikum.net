/*
  Warnings:

  - The `order` column on the `Topic` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Topic" DROP COLUMN "order",
ADD COLUMN     "order" SERIAL NOT NULL;
