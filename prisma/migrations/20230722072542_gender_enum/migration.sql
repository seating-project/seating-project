/*
  Warnings:

  - Changed the type of `gender` on the `Student` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female');

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender" NOT NULL;
