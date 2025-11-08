/*
  Warnings:

  - Added the required column `name_plano` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "name_plano" TEXT NOT NULL;
