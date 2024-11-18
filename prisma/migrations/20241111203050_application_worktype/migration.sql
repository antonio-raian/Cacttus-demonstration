/*
  Warnings:

  - You are about to drop the column `stack` on the `Application` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Application" DROP COLUMN "stack",
ADD COLUMN     "workStyle" TEXT;
