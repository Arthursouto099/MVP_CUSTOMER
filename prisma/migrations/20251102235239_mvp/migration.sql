-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "planoId" TEXT;

-- CreateTable
CREATE TABLE "Plano" (
    "id_plan" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Plano_pkey" PRIMARY KEY ("id_plan")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id_subscription" TEXT NOT NULL,
    "id_plan" TEXT NOT NULL,
    "id_mpPreapprovalId" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "Status_subscription" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id_subscription")
);

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_planoId_fkey" FOREIGN KEY ("planoId") REFERENCES "Plano"("id_plan") ON DELETE SET NULL ON UPDATE CASCADE;
