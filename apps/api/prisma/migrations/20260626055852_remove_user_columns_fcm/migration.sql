/*
  Warnings:

  - You are about to drop the column `approval` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `fcm` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `hod` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `hr` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `otp` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `verificationOtp` on the `user` table. All the data in the column will be lost.
  - Made the column `createdAt` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `approval`,
    DROP COLUMN `employeeId`,
    DROP COLUMN `expiresAt`,
    DROP COLUMN `fcm`,
    DROP COLUMN `hod`,
    DROP COLUMN `hr`,
    DROP COLUMN `otp`,
    DROP COLUMN `verificationOtp`,
    MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
