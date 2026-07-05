-- Enblae vector extensin
CREATE EXTENSION IF NOT EXISTS vector;

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "document_chunks" (
    "source" TEXT,
    "content" TEXT,
    "embedding" vector,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "metadata" JSONB,

    CONSTRAINT "document_chunks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "langchain_documents" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "content" TEXT,
    "metadata" JSONB,
    "embedding" vector,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "langchain_documents_pkey" PRIMARY KEY ("id")
);

