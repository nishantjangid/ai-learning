import { llm } from "./langchain/models/chatModel.js";
import { prompt } from "./langchain/prompts/prompt.js";

// const response = await llm.invoke(
//   "What is AWS Lambda?"
// );

// console.log(response.content);
const formatPrompt = await prompt.invoke({
    context:"you need to answer only around aws",
    question:"What is aws and its services"
})

const answer = await llm.invoke(formatPrompt)

console.log(answer.content)