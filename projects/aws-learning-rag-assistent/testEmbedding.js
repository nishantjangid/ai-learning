// testEmbedding.js

import { createEmbedding } from "./src/services/embedder.js";

const embedding = await createEmbedding("What is AWS Lambda?");

console.log("Vector Length:", embedding.length);

console.log(embedding.slice(0, 10));
