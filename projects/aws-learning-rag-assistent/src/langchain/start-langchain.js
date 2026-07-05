import readline from "readline";

import { retriever } from "./langchain/retrievers/retriever.js";
import { chain } from "./langchain/chains/chain.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("AWS RAG Assistant");
console.log("Type exit to quit.\n");

function askQuestion() {
  rl.question("You: ", async (question) => {
    if (question.toLowerCase() === "exit") {
      rl.close();
      return;
    }

    try {
      console.log("\nSearching documents...\n");

      const docs = await retriever.invoke(question);

      const context = docs
        .map((doc) => doc.pageContent)
        .join("\n\n");

      const answer = await chain.invoke({
        question,
        context,
      });

      console.log("Assistant:\n");
      console.log(answer);
      console.log();
    } catch (err) {
      console.error(err);
    }

    askQuestion();
  });
}

askQuestion();