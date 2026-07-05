// src/services/embedder.js

import { getEnv } from "../../config/env.js";

export async function createEmbedding(text) {
  try {
    const response = await fetch(`${getEnv("OLLAMA_URL")}/api/embeddings`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        model: "nomic-embed-text",
        prompt: text,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama Error: ${response.status}`);
    }

    const data = await response.json();

    return data.embedding;
  } catch (error) {
    console.error("Embedding Error:", error.message);

    throw error;
  }
}
