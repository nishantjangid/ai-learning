import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});

const response = await client.chat.completions.create({
  model: process.env.model,
  messages: [
    {
      role: "user",
      content: "Explain embeddings"
    }
  ]
});

console.log(response.choices[0].message.content);
/**
 * What is an embedding?
 * An embedding is a numerical vector representation of data (such as text or images) that captures its meaning, allowing AI systems to measure similarity and relationships between different pieces of information.
 */