import readline from "readline";

import {
  searchDocs,
}
  from "./services/search.js";

import {
  askLLM,
}
  from "./services/chat.js";

const rl =
 readline.createInterface({
   input: process.stdin,
   output: process.stdout,
 });

rl.question(
  "Ask AWS Question: ",
  async(question)=>{

    const docs =
   await searchDocs(
     question,
   );

    const context =
   docs
     .map(
       doc =>
         doc.content,
     )
     .join("\n\n");

    const answer =
   await askLLM(
     question,
     context,
   );

    console.log(
      "\nAnswer:\n",
    );

    console.log(answer);

    rl.close();
  });
