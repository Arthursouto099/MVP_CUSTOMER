-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('BRONZE', 'PRATA', 'OURO');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('VIP', 'REGULAR', 'NOVO');

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "frequent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "plan" "Plan" NOT NULL DEFAULT 'BRONZE',
ADD COLUMN     "priority" "Priority" NOT NULL DEFAULT 'NOVO';
