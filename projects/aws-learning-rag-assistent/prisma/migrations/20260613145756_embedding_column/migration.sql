/*
  Warnings:

  - Added the required column `embedding` to the `document_chunks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "document_chunks" ADD COLUMN     "embedding" TEXT NOT NULL;
