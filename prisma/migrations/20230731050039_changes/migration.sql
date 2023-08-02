/*
  Warnings:

  - You are about to drop the `_DepartmentsLeft` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DepartmentsRight` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `endDate` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `templateId` to the `Exam` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_Departments" DROP CONSTRAINT "_Departments_B_fkey";

-- DropForeignKey
ALTER TABLE "_DepartmentsLeft" DROP CONSTRAINT "_DepartmentsLeft_A_fkey";

-- DropForeignKey
ALTER TABLE "_DepartmentsLeft" DROP CONSTRAINT "_DepartmentsLeft_B_fkey";

-- DropForeignKey
ALTER TABLE "_DepartmentsRight" DROP CONSTRAINT "_DepartmentsRight_A_fkey";

-- DropForeignKey
ALTER TABLE "_DepartmentsRight" DROP CONSTRAINT "_DepartmentsRight_B_fkey";

-- AlterTable
ALTER TABLE "Exam" ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "templateId" INTEGER NOT NULL,
ALTER COLUMN "minimumStudentsInRoom" DROP DEFAULT;

-- DropTable
DROP TABLE "_DepartmentsLeft";

-- DropTable
DROP TABLE "_DepartmentsRight";

-- CreateTable
CREATE TABLE "_DepartmentsLeftBoys" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_DepartmentsRightBoys" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_DepartmentsLeftGirls" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_DepartmentsRightGirls" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DepartmentsLeftBoys_AB_unique" ON "_DepartmentsLeftBoys"("A", "B");

-- CreateIndex
CREATE INDEX "_DepartmentsLeftBoys_B_index" ON "_DepartmentsLeftBoys"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DepartmentsRightBoys_AB_unique" ON "_DepartmentsRightBoys"("A", "B");

-- CreateIndex
CREATE INDEX "_DepartmentsRightBoys_B_index" ON "_DepartmentsRightBoys"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DepartmentsLeftGirls_AB_unique" ON "_DepartmentsLeftGirls"("A", "B");

-- CreateIndex
CREATE INDEX "_DepartmentsLeftGirls_B_index" ON "_DepartmentsLeftGirls"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DepartmentsRightGirls_AB_unique" ON "_DepartmentsRightGirls"("A", "B");

-- CreateIndex
CREATE INDEX "_DepartmentsRightGirls_B_index" ON "_DepartmentsRightGirls"("B");

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DepartmentsLeftBoys" ADD CONSTRAINT "_DepartmentsLeftBoys_A_fkey" FOREIGN KEY ("A") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DepartmentsLeftBoys" ADD CONSTRAINT "_DepartmentsLeftBoys_B_fkey" FOREIGN KEY ("B") REFERENCES "Exam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DepartmentsRightBoys" ADD CONSTRAINT "_DepartmentsRightBoys_A_fkey" FOREIGN KEY ("A") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DepartmentsRightBoys" ADD CONSTRAINT "_DepartmentsRightBoys_B_fkey" FOREIGN KEY ("B") REFERENCES "Exam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DepartmentsLeftGirls" ADD CONSTRAINT "_DepartmentsLeftGirls_A_fkey" FOREIGN KEY ("A") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DepartmentsLeftGirls" ADD CONSTRAINT "_DepartmentsLeftGirls_B_fkey" FOREIGN KEY ("B") REFERENCES "Exam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DepartmentsRightGirls" ADD CONSTRAINT "_DepartmentsRightGirls_A_fkey" FOREIGN KEY ("A") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DepartmentsRightGirls" ADD CONSTRAINT "_DepartmentsRightGirls_B_fkey" FOREIGN KEY ("B") REFERENCES "Exam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Departments" ADD CONSTRAINT "_Departments_B_fkey" FOREIGN KEY ("B") REFERENCES "Exam"("id") ON DELETE CASCADE ON UPDATE CASCADE;
