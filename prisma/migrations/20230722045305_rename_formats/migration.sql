/*
  Warnings:

  - You are about to drop the `_departments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_departmentsLeft` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_departmentsRight` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_girlsRooms` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_roomsOrder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_departments" DROP CONSTRAINT "_departments_A_fkey";

-- DropForeignKey
ALTER TABLE "_departments" DROP CONSTRAINT "_departments_B_fkey";

-- DropForeignKey
ALTER TABLE "_departmentsLeft" DROP CONSTRAINT "_departmentsLeft_A_fkey";

-- DropForeignKey
ALTER TABLE "_departmentsLeft" DROP CONSTRAINT "_departmentsLeft_B_fkey";

-- DropForeignKey
ALTER TABLE "_departmentsRight" DROP CONSTRAINT "_departmentsRight_A_fkey";

-- DropForeignKey
ALTER TABLE "_departmentsRight" DROP CONSTRAINT "_departmentsRight_B_fkey";

-- DropForeignKey
ALTER TABLE "_girlsRooms" DROP CONSTRAINT "_girlsRooms_A_fkey";

-- DropForeignKey
ALTER TABLE "_girlsRooms" DROP CONSTRAINT "_girlsRooms_B_fkey";

-- DropForeignKey
ALTER TABLE "_roomsOrder" DROP CONSTRAINT "_roomsOrder_A_fkey";

-- DropForeignKey
ALTER TABLE "_roomsOrder" DROP CONSTRAINT "_roomsOrder_B_fkey";

-- DropTable
DROP TABLE "_departments";

-- DropTable
DROP TABLE "_departmentsLeft";

-- DropTable
DROP TABLE "_departmentsRight";

-- DropTable
DROP TABLE "_girlsRooms";

-- DropTable
DROP TABLE "_roomsOrder";

-- CreateTable
CREATE TABLE "_DepartmentsLeft" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_DepartmentsRight" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Departments" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_RoomsOrder" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_GirlsRooms" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DepartmentsLeft_AB_unique" ON "_DepartmentsLeft"("A", "B");

-- CreateIndex
CREATE INDEX "_DepartmentsLeft_B_index" ON "_DepartmentsLeft"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DepartmentsRight_AB_unique" ON "_DepartmentsRight"("A", "B");

-- CreateIndex
CREATE INDEX "_DepartmentsRight_B_index" ON "_DepartmentsRight"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Departments_AB_unique" ON "_Departments"("A", "B");

-- CreateIndex
CREATE INDEX "_Departments_B_index" ON "_Departments"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RoomsOrder_AB_unique" ON "_RoomsOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_RoomsOrder_B_index" ON "_RoomsOrder"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GirlsRooms_AB_unique" ON "_GirlsRooms"("A", "B");

-- CreateIndex
CREATE INDEX "_GirlsRooms_B_index" ON "_GirlsRooms"("B");

-- AddForeignKey
ALTER TABLE "_DepartmentsLeft" ADD CONSTRAINT "_DepartmentsLeft_A_fkey" FOREIGN KEY ("A") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DepartmentsLeft" ADD CONSTRAINT "_DepartmentsLeft_B_fkey" FOREIGN KEY ("B") REFERENCES "Exam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DepartmentsRight" ADD CONSTRAINT "_DepartmentsRight_A_fkey" FOREIGN KEY ("A") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DepartmentsRight" ADD CONSTRAINT "_DepartmentsRight_B_fkey" FOREIGN KEY ("B") REFERENCES "Exam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Departments" ADD CONSTRAINT "_Departments_A_fkey" FOREIGN KEY ("A") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Departments" ADD CONSTRAINT "_Departments_B_fkey" FOREIGN KEY ("B") REFERENCES "Template"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoomsOrder" ADD CONSTRAINT "_RoomsOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "Exam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoomsOrder" ADD CONSTRAINT "_RoomsOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GirlsRooms" ADD CONSTRAINT "_GirlsRooms_A_fkey" FOREIGN KEY ("A") REFERENCES "Exam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GirlsRooms" ADD CONSTRAINT "_GirlsRooms_B_fkey" FOREIGN KEY ("B") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
