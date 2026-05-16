/*
  Warnings:

  - Added the required column `hash` to the `Utilizador` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Utilizador" ADD COLUMN     "hash" TEXT NOT NULL,
ADD COLUMN     "hashedRt" TEXT;
