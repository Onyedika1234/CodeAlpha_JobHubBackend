/*
  Warnings:

  - You are about to drop the column `userId` on the `company` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `company` DROP FOREIGN KEY `Company_userId_fkey`;

-- DropIndex
DROP INDEX `Company_userId_fkey` ON `company`;

-- AlterTable
ALTER TABLE `company` DROP COLUMN `userId`;
