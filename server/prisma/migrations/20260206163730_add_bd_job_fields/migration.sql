-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "deadline" TIMESTAMP(3),
ADD COLUMN     "education" TEXT,
ADD COLUMN     "experience" TEXT,
ADD COLUMN     "gender" TEXT DEFAULT 'Both',
ADD COLUMN     "jobContext" TEXT,
ADD COLUMN     "vacancies" INTEGER DEFAULT 1,
ADD COLUMN     "workplace" TEXT;
