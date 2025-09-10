/*
  Warnings:

  - You are about to drop the column `loadPercentage` on the `RackComponent` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[rackComponentId]` on the table `Specs` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."RackComponent" DROP COLUMN "loadPercentage";

-- CreateIndex
CREATE UNIQUE INDEX "Specs_rackComponentId_key" ON "public"."Specs"("rackComponentId");
