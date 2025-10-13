/*
  Warnings:

  - The values [CAMINHÂO] on the enum `TypeVehicle` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TypeVehicle_new" AS ENUM ('CARRO', 'MOTO', 'CAMINHAO', 'OUTRO');
ALTER TABLE "public"."Vehicle" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "Vehicle" ALTER COLUMN "type" TYPE "TypeVehicle_new" USING ("type"::text::"TypeVehicle_new");
ALTER TYPE "TypeVehicle" RENAME TO "TypeVehicle_old";
ALTER TYPE "TypeVehicle_new" RENAME TO "TypeVehicle";
DROP TYPE "public"."TypeVehicle_old";
ALTER TABLE "Vehicle" ALTER COLUMN "type" SET DEFAULT 'OUTRO';
COMMIT;
