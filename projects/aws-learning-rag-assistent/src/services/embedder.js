// src/services/embedder.js

import dotenv from "dotenv";
dotenv.config({ path:"../../../.env" });

export async function createEmbedding(
  text,
) {
  try {

    const response =
      await fetch(
        `${process.env.OLLAMA_URL}/api/embeddings`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            model: "nomic-embed-text",
            prompt: text,
          }),
        },
      );

    if (!response.ok) {
      throw new Error(
        `Ollama Error: ${response.status}`,
      );
    }

    const data =
      await response.json();

    return data.embedding;

  } catch (error) {

    console.error(
      "Embedding Error:",
      error.message,
    );

    throw error;
  }
}
