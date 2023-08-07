-- CreateEnum
CREATE TYPE "DepartmentType" AS ENUM ('Circuit', 'NonCircuit', 'PhD');

-- CreateEnum
CREATE TYPE "DegreeType" AS ENUM ('Bachelors', 'Masters', 'PhD');

-- CreateEnum
CREATE TYPE "SecondColumnOptions" AS ENUM ('PresentAbsent', 'SeatNumber');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "password" TEXT,
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Logo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Logo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "registerNumber" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "departmentId" INTEGER NOT NULL,
    "yearId" INTEGER NOT NULL,
    "degreeId" INTEGER NOT NULL,
    "phone_number" TEXT,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Year" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "Year_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Degree" (
    "id" SERIAL NOT NULL,
    "degree" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "type" "DegreeType" NOT NULL,

    CONSTRAINT "Degree_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" SERIAL NOT NULL,
    "branch" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "type" "DepartmentType" NOT NULL,
    "degreeId" INTEGER NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Building" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "templateId" INTEGER,

    CONSTRAINT "Building_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "floor" INTEGER NOT NULL,
    "strength" INTEGER NOT NULL,
    "buildingId" INTEGER NOT NULL,
    "blockId" INTEGER NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Block" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "buildingId" INTEGER NOT NULL,

    CONSTRAINT "Block_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exam" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isPhD" BOOLEAN NOT NULL,
    "isMe" BOOLEAN NOT NULL,
    "isYearsTogether" BOOLEAN NOT NULL,
    "isDepartmentsTogether" BOOLEAN NOT NULL,
    "isSendWhatsappMessage" BOOLEAN NOT NULL,
    "timeToSendWhatsappMessage" TIMESTAMP(3),
    "templateId" INTEGER NOT NULL,
    "Timetable" JSONB NOT NULL DEFAULT '{}',
    "secondColumnOptions" "SecondColumnOptions" NOT NULL,
    "DepartmentsBuildingWise" JSONB NOT NULL DEFAULT '{}',
    "minimumStudentsInRoom" INTEGER NOT NULL,
    "randomizeEveryNRooms" INTEGER NOT NULL DEFAULT 0,
    "strictlyDivideBuildings" BOOLEAN NOT NULL DEFAULT false,
    "isCommonRoomStrength" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Exam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Template" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "numberOfRows" INTEGER NOT NULL,
    "numberOfColumns" INTEGER NOT NULL,
    "roomStrength" INTEGER NOT NULL,
    "isSingleSeater" BOOLEAN NOT NULL,
    "isBoysGirlsSeparate" BOOLEAN NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "isAlternateDepartmentSeated" BOOLEAN NOT NULL,
    "isRandomizedDepartments" BOOLEAN NOT NULL,
    "logoId" INTEGER NOT NULL,

    CONSTRAINT "Template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DepartmentToSubject" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

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

-- CreateTable
CREATE TABLE "_Departments" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_RoomToTemplate" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Years" (
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
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Logo_name_key" ON "Logo"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Student_registerNumber_key" ON "Student"("registerNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Year_year_key" ON "Year"("year");

-- CreateIndex
CREATE UNIQUE INDEX "Degree_degree_key" ON "Degree"("degree");

-- CreateIndex
CREATE UNIQUE INDEX "Department_branch_key" ON "Department"("branch");

-- CreateIndex
CREATE UNIQUE INDEX "Department_shortName_key" ON "Department"("shortName");

-- CreateIndex
CREATE UNIQUE INDEX "Building_name_key" ON "Building"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Room_number_key" ON "Room"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Block_name_key" ON "Block"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_code_key" ON "Subject"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Exam_name_key" ON "Exam"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Template_name_key" ON "Template"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_DepartmentToSubject_AB_unique" ON "_DepartmentToSubject"("A", "B");

-- CreateIndex
CREATE INDEX "_DepartmentToSubject_B_index" ON "_DepartmentToSubject"("B");

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

-- CreateIndex
CREATE UNIQUE INDEX "_Departments_AB_unique" ON "_Departments"("A", "B");

-- CreateIndex
CREATE INDEX "_Departments_B_index" ON "_Departments"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RoomToTemplate_AB_unique" ON "_RoomToTemplate"("A", "B");

-- CreateIndex
CREATE INDEX "_RoomToTemplate_B_index" ON "_RoomToTemplate"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Years_AB_unique" ON "_Years"("A", "B");

-- CreateIndex
CREATE INDEX "_Years_B_index" ON "_Years"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RoomsOrder_AB_unique" ON "_RoomsOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_RoomsOrder_B_index" ON "_RoomsOrder"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GirlsRooms_AB_unique" ON "_GirlsRooms"("A", "B");

-- CreateIndex
CREATE INDEX "_GirlsRooms_B_index" ON "_GirlsRooms"("B");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_yearId_fkey" FOREIGN KEY ("yearId") REFERENCES "Year"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_degreeId_fkey" FOREIGN KEY ("degreeId") REFERENCES "Degree"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_degreeId_fkey" FOREIGN KEY ("degreeId") REFERENCES "Degree"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Building" ADD CONSTRAINT "Building_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_blockId_fkey" FOREIGN KEY ("blockId") REFERENCES "Block"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Block" ADD CONSTRAINT "Block_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_logoId_fkey" FOREIGN KEY ("logoId") REFERENCES "Logo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DepartmentToSubject" ADD CONSTRAINT "_DepartmentToSubject_A_fkey" FOREIGN KEY ("A") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DepartmentToSubject" ADD CONSTRAINT "_DepartmentToSubject_B_fkey" FOREIGN KEY ("B") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

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
ALTER TABLE "_Departments" ADD CONSTRAINT "_Departments_A_fkey" FOREIGN KEY ("A") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Departments" ADD CONSTRAINT "_Departments_B_fkey" FOREIGN KEY ("B") REFERENCES "Exam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoomToTemplate" ADD CONSTRAINT "_RoomToTemplate_A_fkey" FOREIGN KEY ("A") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoomToTemplate" ADD CONSTRAINT "_RoomToTemplate_B_fkey" FOREIGN KEY ("B") REFERENCES "Template"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Years" ADD CONSTRAINT "_Years_A_fkey" FOREIGN KEY ("A") REFERENCES "Exam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Years" ADD CONSTRAINT "_Years_B_fkey" FOREIGN KEY ("B") REFERENCES "Year"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoomsOrder" ADD CONSTRAINT "_RoomsOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "Exam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoomsOrder" ADD CONSTRAINT "_RoomsOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GirlsRooms" ADD CONSTRAINT "_GirlsRooms_A_fkey" FOREIGN KEY ("A") REFERENCES "Exam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GirlsRooms" ADD CONSTRAINT "_GirlsRooms_B_fkey" FOREIGN KEY ("B") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
