-- AlterTable
ALTER TABLE "document_chunks" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

-- CreateTable
CREATE TABLE "langchain_documents" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "content" TEXT,
    "metadata" JSONB,
    "embedding" vector,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "langchain_documents_pkey" PRIMARY KEY ("id")
);
