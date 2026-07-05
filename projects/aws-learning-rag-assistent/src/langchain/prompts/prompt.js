import { ChatPromptTemplate } from "@langchain/core/prompts";
export const prompt = ChatPromptTemplate.fromTemplate(`
You are an AWS expert.

Answer ONLY using the retrieved context.

Context:
{context}

Question:
{question}
`);
