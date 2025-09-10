/*
  Warnings:

  - The primary key for the `Cinema` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "public"."RackComponent" DROP CONSTRAINT "RackComponent_cinemaId_fkey";

-- AlterTable
ALTER TABLE "public"."Cinema" DROP CONSTRAINT "Cinema_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Cinema_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Cinema_id_seq";

-- AlterTable
ALTER TABLE "public"."RackComponent" ALTER COLUMN "cinemaId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "public"."RackComponent" ADD CONSTRAINT "RackComponent_cinemaId_fkey" FOREIGN KEY ("cinemaId") REFERENCES "public"."Cinema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
