/*
  Warnings:

  - You are about to drop the column `customer_id` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `isPaid` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Service` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Service" DROP CONSTRAINT "Service_customer_id_fkey";

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "customer_id",
DROP COLUMN "isPaid",
DROP COLUMN "status";
