/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `paymentLink` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Service` table. All the data in the column will be lost.
  - Added the required column `service_type` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Service" DROP COLUMN "createdAt",
DROP COLUMN "paymentLink",
DROP COLUMN "type",
ADD COLUMN     "checkInDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "checkOutDate" TIMESTAMP(3),
ADD COLUMN     "isPaid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "service_type" TEXT NOT NULL;
