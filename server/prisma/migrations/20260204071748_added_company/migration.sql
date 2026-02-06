/*
  Warnings:

  - You are about to drop the column `userId` on the `Employer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[contactEmail]` on the table `Employer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `Employer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Employer" DROP CONSTRAINT "Employer_userId_fkey";

-- DropIndex
DROP INDEX "Employer_userId_key";

-- AlterTable
ALTER TABLE "Employer" DROP COLUMN "userId",
ADD COLUMN     "password" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Employer_contactEmail_key" ON "Employer"("contactEmail");
