-- CreateTable
CREATE TABLE `settings` (
    `SettingId` INTEGER NOT NULL AUTO_INCREMENT,
    `UserId` VARCHAR(191) NOT NULL,
    `Notification` BOOLEAN NULL,
    `BioMatrics` BOOLEAN NULL,
    `COMPCODE` VARCHAR(191) NULL,

    UNIQUE INDEX `settings_UserId_key`(`UserId`),
    PRIMARY KEY (`SettingId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `pic` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `otpemail` VARCHAR(191) NULL,
    `approval` VARCHAR(191) NOT NULL DEFAULT 'HOD',
    `password` VARCHAR(191) NULL,
    `Idcard` VARCHAR(191) NULL,
    `roleId` VARCHAR(191) NULL,
    `otp` VARCHAR(191) NULL,
    `hod` VARCHAR(191) NULL,
    `hr` VARCHAR(191) NULL,
    `level` VARCHAR(191) NOT NULL DEFAULT 'user',
    `verificationOtp` VARCHAR(191) NULL,
    `expiresAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `active` BOOLEAN NOT NULL DEFAULT true,
    `employeeId` INTEGER NULL,
    `isAllParty` BOOLEAN NOT NULL DEFAULT false,
    `isAdmin` BOOLEAN NOT NULL DEFAULT false,
    `fcm` VARCHAR(191) NULL DEFAULT '',

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_Idcard_key`(`Idcard`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `COMPCODE` VARCHAR(191) NOT NULL DEFAULT '',
    `active` VARCHAR(191) NOT NULL DEFAULT 'Yes',
    `defaultRole` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Role_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RoleOnPage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `roleId` INTEGER NULL,
    `roleName` VARCHAR(191) NOT NULL,
    `read` BOOLEAN NOT NULL DEFAULT false,
    `create` BOOLEAN NOT NULL DEFAULT false,
    `edit` BOOLEAN NOT NULL DEFAULT false,
    `link` VARCHAR(191) NOT NULL,
    `delete` BOOLEAN NOT NULL DEFAULT false,
    `isdefault` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `settings` ADD CONSTRAINT `settings_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `User`(`Idcard`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`name`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoleOnPage` ADD CONSTRAINT `RoleOnPage_roleName_fkey` FOREIGN KEY (`roleName`) REFERENCES `Role`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;
