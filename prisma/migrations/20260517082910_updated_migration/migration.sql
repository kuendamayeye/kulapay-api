/*
  Warnings:

  - Added the required column `entidade` to the `Carteira` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Carteira" ADD COLUMN     "entidade" TEXT NOT NULL,
ADD COLUMN     "referencia" TEXT;
