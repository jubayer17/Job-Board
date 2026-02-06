-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "companyId" TEXT;

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "tradeLicense" TEXT,
    "yearOfEstablishment" TEXT,
    "industryType" TEXT,
    "description" TEXT,
    "address" TEXT,
    "websiteUrl" TEXT,
    "contactPersonName" TEXT,
    "contactPersonDesignation" TEXT,
    "contactPersonEmail" TEXT,
    "contactPersonMobile" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_username_key" ON "Company"("username");

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
