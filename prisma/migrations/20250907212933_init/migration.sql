/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Cinema` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Cinema` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `RackComponent` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `RackComponent` table. All the data in the column will be lost.
  - You are about to drop the `PortDetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Spec` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address` to the `Cinema` table without a default value. This is not possible if the table is not empty.
  - Added the required column `generator` to the `Cinema` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastUpdated` to the `Cinema` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `RackComponent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `model` to the `RackComponent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `RackComponent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `RackComponent` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."PortDetail" DROP CONSTRAINT "PortDetail_specId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Spec" DROP CONSTRAINT "Spec_rackComponentId_fkey";

-- AlterTable
ALTER TABLE "public"."Cinema" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "generator" BOOLEAN NOT NULL,
ADD COLUMN     "lastUpdated" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."RackComponent" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "batteryInstallDate" TIMESTAMP(3),
ADD COLUMN     "capacityVA" INTEGER,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "loadPercentage" INTEGER,
ADD COLUMN     "model" TEXT NOT NULL,
ADD COLUMN     "position" INTEGER NOT NULL,
ADD COLUMN     "powerConsumption" INTEGER,
ADD COLUMN     "status" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."PortDetail";

-- DropTable
DROP TABLE "public"."Spec";

-- CreateTable
CREATE TABLE "public"."Specs" (
    "id" SERIAL NOT NULL,
    "ram" TEXT,
    "storage" TEXT,
    "cpu" TEXT,
    "ports" INTEGER,
    "connections" INTEGER,
    "rackComponentId" INTEGER NOT NULL,

    CONSTRAINT "Specs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PortDetails" (
    "id" SERIAL NOT NULL,
    "portNumber" INTEGER NOT NULL,
    "isConnected" BOOLEAN NOT NULL,
    "connectedTo" TEXT,
    "description" TEXT,
    "specId" INTEGER NOT NULL,

    CONSTRAINT "PortDetails_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Specs" ADD CONSTRAINT "Specs_rackComponentId_fkey" FOREIGN KEY ("rackComponentId") REFERENCES "public"."RackComponent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PortDetails" ADD CONSTRAINT "PortDetails_specId_fkey" FOREIGN KEY ("specId") REFERENCES "public"."Specs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
