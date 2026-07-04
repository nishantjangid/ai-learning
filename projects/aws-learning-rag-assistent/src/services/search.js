import { prisma }
  from "../config/prisma.js";

import {
  createEmbedding,
}
  from "./embedder.js";

export async function searchDocs(
  question,
) {

  const embedding =
   await createEmbedding(
     question,
   );

  const vector =
   `[${embedding.join(",")}]`;

  const results =
   await prisma.$queryRawUnsafe(
     `
SELECT
 id,
 source,
 content,

 embedding <=> $1::vector
 AS distance

FROM document_chunks

ORDER BY distance

LIMIT 5
`,
     vector,
   );

  return results;
}
