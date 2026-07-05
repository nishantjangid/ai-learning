import { Embeddings } from "@langchain/core/embeddings";
import { PGVectorStore } from "@langchain/community/vectorstores/pgvector";

import { getEnv } from "../../config/env.js";
import { createEmbedding } from "../../services/embedder.js";

class OllamaEmbeddingAdapter extends Embeddings {
  constructor() {
    super();
  }

  async embedQuery(text) {
    return await createEmbedding(text);
  }

  async embedDocuments(texts) {
    const embeddings = [];

    // Process sequentially to avoid Ollama timeout
    for (let i = 0; i < texts.length; i++) {
      console.log(
        `Embedding ${i + 1}/${texts.length}`
      );

      const vector = await this.embedQuery(texts[i]);

      embeddings.push(vector);
    }

    return embeddings;
  }
}

console.log("Initializing vector store...");

const embeddings = new OllamaEmbeddingAdapter({
  model: "nomic-embed-text",
  baseUrl: getEnv("OLLAMA_URL", "http://127.0.0.1:11434"),
});

export const vectorStore =
await PGVectorStore.initialize(
    embeddings,
    {
        postgresConnectionOptions: {
            connectionString:
                getEnv("DATABASE_URL"),
        },

        tableName:
            "langchain_documents",

        columns: {
            idColumnName: "id",
            contentColumnName: "content",
            vectorColumnName: "embedding",
            metadataColumnName: "metadata",
        },
    }
);