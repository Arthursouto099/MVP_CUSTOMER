-- CreateEnum
CREATE TYPE "TypeVehicle" AS ENUM ('CARRO', 'MOTO', 'CAMINHÂO', 'OUTRO');

-- CreateTable
CREATE TABLE "Vehicle" (
    "id_vehicle" TEXT NOT NULL,
    "id_customer" TEXT NOT NULL,
    "type" "TypeVehicle" NOT NULL DEFAULT 'OUTRO',
    "model" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "year" TEXT NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id_vehicle")
);

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_id_customer_fkey" FOREIGN KEY ("id_customer") REFERENCES "Customer"("id_customer") ON DELETE RESTRICT ON UPDATE CASCADE;
