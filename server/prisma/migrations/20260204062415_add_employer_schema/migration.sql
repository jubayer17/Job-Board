/*
  Warnings:

  - You are about to drop the column `contactPersonDesignation` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `contactPersonEmail` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `contactPersonMobile` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `contactPersonName` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Company` table. All the data in the column will be lost.
  - Added the required column `employerId` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Company_username_key";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "contactPersonDesignation",
DROP COLUMN "contactPersonEmail",
DROP COLUMN "contactPersonMobile",
DROP COLUMN "contactPersonName",
DROP COLUMN "password",
DROP COLUMN "username",
ADD COLUMN     "employerId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Employer" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "contactDesignation" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "contactMobile" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Employer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employer_userId_key" ON "Employer"("userId");

-- AddForeignKey
ALTER TABLE "Employer" ADD CONSTRAINT "Employer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_employerId_fkey" FOREIGN KEY ("employerId") REFERENCES "Employer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
