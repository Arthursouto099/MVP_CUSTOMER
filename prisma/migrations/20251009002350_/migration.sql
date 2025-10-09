/*
  Warnings:

  - The `status` column on the `Service` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `car_model` on table `Customer` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "StatusService" AS ENUM ('PRONTO', 'EM_LAVAGEM', 'AGENDADO', 'CANCELADO', 'DESTRUIDO');

-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "car_model" SET NOT NULL;

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "status",
ADD COLUMN     "status" "StatusService" NOT NULL DEFAULT 'AGENDADO';
