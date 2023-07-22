/*
  Warnings:

  - A unique constraint covering the columns `[shortName]` on the table `Department` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Department_shortName_key" ON "Department"("shortName");
