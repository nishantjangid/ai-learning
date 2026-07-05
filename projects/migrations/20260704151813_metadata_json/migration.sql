/*
  Warnings:

  - The `metadata` column on the `document_chunks` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "document_chunks" DROP COLUMN "metadata",
ADD COLUMN     "metadata" JSONB;
