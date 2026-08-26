/*
  Warnings:

  - You are about to drop the column `company` on the `job` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `job` table. All the data in the column will be lost.
  - You are about to alter the column `jobtype` on the `job` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.
  - You are about to drop the `company` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `candidateId` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employerId` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `job` DROP FOREIGN KEY `Job_userId_fkey`;

-- DropIndex
DROP INDEX `Job_userId_fkey` ON `job`;

-- AlterTable
ALTER TABLE `job` DROP COLUMN `company`,
    DROP COLUMN `userId`,
    ADD COLUMN `candidateId` VARCHAR(191) NOT NULL,
    ADD COLUMN `employerId` VARCHAR(191) NOT NULL,
    MODIFY `jobtype` ENUM('REMOTE', 'ONSITE', 'HYBRID') NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('RECRUITER', 'TALENT') NOT NULL DEFAULT 'TALENT';

-- DropTable
DROP TABLE `company`;

-- CreateTable
CREATE TABLE `Employer` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Job` ADD CONSTRAINT `Job_employerId_fkey` FOREIGN KEY (`employerId`) REFERENCES `Employer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Job` ADD CONSTRAINT `Job_candidateId_fkey` FOREIGN KEY (`candidateId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
