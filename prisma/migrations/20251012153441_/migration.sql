/*
  Warnings:

  - You are about to drop the column `checkOutDate` on the `Service` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "TypeService" AS ENUM ('AVULSO', 'ASSINATURA');

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "checkOutDate",
ADD COLUMN     "type" "TypeService" NOT NULL DEFAULT 'AVULSO';
