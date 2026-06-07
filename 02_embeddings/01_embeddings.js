import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import OpenAI from "openai";
import GLOBAL from "../shared/envs_enum.js";

const client = new OpenAI({
  apiKey: GLOBAL.GROQ_API_KEY,
  baseURL: GLOBAL.GROQ_API_URL,
});

const response = await client.chat.completions.create({
  model: GLOBAL.model,
  messages: [
    {
      role: "user",
      content: "Explain embeddings",
    },
  ],
});

console.log(response.choices[0].message.content);
/**
 * What is an embedding?
 * An embedding is a numerical vector representation of data (such as text or images) that captures its meaning, allowing AI systems to measure similarity and relationships between different pieces of information.
 */
