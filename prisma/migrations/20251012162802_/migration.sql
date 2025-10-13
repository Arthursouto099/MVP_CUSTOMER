-- CreateEnum
CREATE TYPE "TypePlan" AS ENUM ('PRATA', 'OURO', 'BRONZE', 'AVULSO');

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "typePlan" "TypePlan" NOT NULL DEFAULT 'AVULSO';
