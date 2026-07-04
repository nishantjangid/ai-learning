import fs from "fs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
import { v4 as uuid } from "uuid";
const pdf = require("pdf-parse");

import { prisma }
  from "../config/prisma.js";

import {
  chunkText,
}
  from "../services/chunker.js";

import {
  createEmbedding,
}
  from "../services/embedder.js";


async function ingest() {

  const buffer = fs.readFileSync(
    "./docs/aws-overview.pdf",
  );
  const pdfData =
    await pdf(buffer);

  const chunks =
    chunkText(
      pdfData.text,
    );

  for (const chunk of chunks) {

    const embedding =
      await createEmbedding(
        chunk,
      );

    await prisma.$executeRawUnsafe(
      `
INSERT INTO document_chunks
(
 id,
 source,
 content,
 embedding
)
VALUES
(
 $1::uuid,
 $2,
 $3,
 $4::vector
)
`,
      uuid(),
      "aws-overview.pdf",
      chunk,
      `[${embedding.join(",")}]`,
    );

    console.log(
      "Chunk inserted",
    );
  }

  console.log(
    "Ingestion complete",
  );
}

ingest();
