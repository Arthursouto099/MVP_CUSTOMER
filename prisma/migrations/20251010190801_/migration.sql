/*
  Warnings:

  - You are about to drop the column `car_model` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `plate` on the `Customer` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."Customer_plate_key";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "car_model",
DROP COLUMN "plate",
ADD COLUMN     "obs" TEXT;
