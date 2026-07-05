import dotenv from "dotenv";
import { ChatGroq } from "@langchain/groq";
import { getEnv } from "../../config/env.js";
const apiKey = getEnv("GROQ_API_KEY") || getEnv("OPENAI_API_KEY");
const model = getEnv("MODEL")

export const llm = new ChatGroq({
  apiKey: apiKey,
  model: model,
  temperature: 0,
});