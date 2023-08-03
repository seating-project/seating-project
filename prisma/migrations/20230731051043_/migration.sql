-- AlterTable
ALTER TABLE "Exam" ADD COLUMN     "DepartmentsBuildingWise" JSONB NOT NULL DEFAULT '{}',
ADD COLUMN     "Timetable" JSONB NOT NULL DEFAULT '{}';
