/*
  Warnings:

  - A unique constraint covering the columns `[resumeId]` on the table `Application` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `candidateId` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resumeId` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `application` ADD COLUMN `candidateId` VARCHAR(191) NOT NULL,
    ADD COLUMN `resumeId` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` ENUM('PENDING', 'REVIEW', 'REJECT', 'ACCEPT') NOT NULL DEFAULT 'PENDING';

-- CreateIndex
CREATE UNIQUE INDEX `Application_resumeId_key` ON `Application`(`resumeId`);

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_candidateId_fkey` FOREIGN KEY (`candidateId`) REFERENCES `Candidate`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
