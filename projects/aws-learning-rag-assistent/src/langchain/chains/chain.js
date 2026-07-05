import { RunnableSequence } from "@langchain/core/runnables";

import { prompt } from "../prompts/prompt.js";
import { llm } from "../models/chatModel.js";
import { parser } from "../parsers/parser.js";

export const chain =
RunnableSequence.from([
    prompt,
    llm,
    parser
]);