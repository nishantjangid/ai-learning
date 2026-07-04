import OpenAI from "openai";

import { getEnv } from "../config/env.js";

const apiKey = getEnv("GROQ_API_KEY") || getEnv("OPENAI_API_KEY");
const baseURL =
  getEnv("GROQ_API_URL") || getEnv("OPENAI_BASE_URL") || "https://api.groq.com/openai/v1";
const model = getEnv("MODEL") || "openai/gpt-oss-120b";

function createClient() {
  if (!apiKey) {
    throw new Error(
      "Missing API credentials. Set GROQ_API_KEY or OPENAI_API_KEY in your .env file.",
    );
  }

  return new OpenAI({
    apiKey,
    baseURL,
  });
}

export async function askLLM(question, context) {
  const client = createClient();
  const response = await client.chat.completions.create({
    model,

    messages: [
      {
        role: "system",
        content: `You are an AWS expert.
    Answer only using
    retrieved context.`,
      },
      {
        role: "user",
        content: `
Context:
${context}

Question:
${question}
`,
      },
    ],
  });

  return response.choices[0].message.content;
}
