/*
  Warnings:

  - Made the column `plate` on table `Customer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "plate" SET NOT NULL;
