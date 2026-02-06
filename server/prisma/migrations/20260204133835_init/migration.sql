/*
  Warnings:

  - You are about to drop the column `postedById` on the `Job` table. All the data in the column will be lost.
  - Made the column `companyId` on table `Job` required. This step will fail if there are existing NULL values in that column.
  - Made the column `employerId` on table `Job` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_employerId_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_postedById_fkey";

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "postedById",
ADD COLUMN     "company" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "companyId" SET NOT NULL,
ALTER COLUMN "employerId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_employerId_fkey" FOREIGN KEY ("employerId") REFERENCES "Employer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
