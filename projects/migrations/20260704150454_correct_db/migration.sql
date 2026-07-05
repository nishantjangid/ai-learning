/*
  Warnings:

  - The primary key for the `document_chunks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `document_chunks` table. All the data in the column will be lost.
  - You are about to alter the column `embedding` on the `document_chunks` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Unsupported("vector")`.
  - Changed the type of `id` on the `document_chunks` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
CREATE EXTENSION IF NOT EXISTS vector;

-- AlterTable
ALTER TABLE "document_chunks" DROP CONSTRAINT "document_chunks_pkey",
DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "metadata" TEXT,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ALTER COLUMN "source" DROP NOT NULL,
ALTER COLUMN "content" DROP NOT NULL,
ALTER COLUMN "embedding" DROP NOT NULL,
ALTER COLUMN "embedding" TYPE vector USING "embedding"::vector,
ADD CONSTRAINT "document_chunks_pkey" PRIMARY KEY ("id");
