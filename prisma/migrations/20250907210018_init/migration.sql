-- CreateTable
CREATE TABLE "public"."Cinema" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cinema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RackComponent" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "cinemaId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RackComponent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Spec" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "rackComponentId" INTEGER NOT NULL,

    CONSTRAINT "Spec_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PortDetail" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "specId" INTEGER NOT NULL,

    CONSTRAINT "PortDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."RackComponent" ADD CONSTRAINT "RackComponent_cinemaId_fkey" FOREIGN KEY ("cinemaId") REFERENCES "public"."Cinema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Spec" ADD CONSTRAINT "Spec_rackComponentId_fkey" FOREIGN KEY ("rackComponentId") REFERENCES "public"."RackComponent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PortDetail" ADD CONSTRAINT "PortDetail_specId_fkey" FOREIGN KEY ("specId") REFERENCES "public"."Spec"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
