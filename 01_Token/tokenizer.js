import { encoding_for_model } from "tiktoken";

const encoder = encoding_for_model("gpt-4o");

const text = "My name is nishant and i am learning AI";

const tokens = encoder.encode(text);

console.log(`Count of token is ${tokens.length} tokens:`, tokens);
encoder.free();

/**
 * Q1. What is a token?
 * A token is the smallest unit of text processed by an LLM. It may represent a word, part of a word, punctuation, or symbols. Before processing, each token is converted into a numerical ID that the model can understand.
 *
 * Q2. Why don't LLMs use words directly?
 * LLMs use tokens because language contains millions of possible words and variations. Breaking text into smaller reusable pieces helps the model learn patterns more efficiently and understand new or uncommon words.
 *
 * Q3. What is a context window?
 * A context window is the amount of information an LLM can keep in its working memory while generating a response. The model can only reason over the information present within this context window.
 *
 * Q4. Why does RAG exist?
 * RAG exists to retrieve only the most relevant information from large datasets before sending it to the LLM. This reduces token usage, lowers cost, improves response quality, and overcomes context window limitations.
 *
 * Q5. How do tokens affect AI application cost?
 * AI providers charge based on the number of input and output tokens processed. More tokens increase cost, latency, and context usage, so AI engineers optimize prompts and retrieval systems to reduce unnecessary tokens.
 */
