import { vectorStore } from "../vectorstores/pgVectorStore.js";

export const retriever = vectorStore.asRetriever({
  k: 5,
});
