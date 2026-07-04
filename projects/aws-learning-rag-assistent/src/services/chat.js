import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config({ path:"../../../.env" });

const client =
 new OpenAI({
   apiKey: process.env.GROQ_API_KEY,
   baseURL: process.env.GROQ_API_URL,
 });

export async function askLLM(
  question,
  context,
) {

  const response =
 await client.chat.completions.create({

   model:
 process.env.MODEL,

   messages:[
     {
       role:"system",
       content:
   `You are an AWS expert.
    Answer only using
    retrieved context.`,
     },
     {
       role:"user",
       content:
`
Context:
${context}

Question:
${question}
`,
     },
   ],
 });

  return response
    .choices[0]
    .message.content;
}
