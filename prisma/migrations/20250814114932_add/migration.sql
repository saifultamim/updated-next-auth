/*
  Warnings:

  - You are about to drop the column `imageType` on the `image` table. All the data in the column will be lost.
  - You are about to drop the column `profileImage` on the `image` table. All the data in the column will be lost.
  - Added the required column `filename` to the `image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `image` DROP COLUMN `imageType`,
    DROP COLUMN `profileImage`,
    ADD COLUMN `filename` VARCHAR(191) NOT NULL,
    ADD COLUMN `url` VARCHAR(191) NOT NULL;
