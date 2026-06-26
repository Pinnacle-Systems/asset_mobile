-- CreateTable
CREATE TABLE `CompanyCode` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Idcard` VARCHAR(191) NOT NULL,
    `companyCode` VARCHAR(191) NOT NULL,
    `GCOMP` VARCHAR(191) NULL,
    `companyid` VARCHAR(191) NOT NULL,

    INDEX `CompanyCode_Idcard_idx`(`Idcard`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CompanyCode` ADD CONSTRAINT `CompanyCode_Idcard_fkey` FOREIGN KEY (`Idcard`) REFERENCES `User`(`Idcard`) ON DELETE CASCADE ON UPDATE CASCADE;
