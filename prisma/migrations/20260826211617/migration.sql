-- DropForeignKey
ALTER TABLE `job` DROP FOREIGN KEY `Job_candidateId_fkey`;

-- DropIndex
DROP INDEX `Job_candidateId_fkey` ON `job`;

-- AlterTable
ALTER TABLE `job` MODIFY `candidateId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Job` ADD CONSTRAINT `Job_candidateId_fkey` FOREIGN KEY (`candidateId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
