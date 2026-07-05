import { loadPDF } from "./loader.js";
import { splitDocuments } from "./splitter.js";
import { vectorStore } from "./vectorstores/pgVectorStore.js";
import { prisma } from "../config/prisma.js";

async function ingest() {
  console.log("Starting ingest...");

  console.log("Loading PDF...");
  const docs = await loadPDF("./docs/aws-overview.pdf");

  console.log(`Loaded ${docs.length} page(s).`);

  console.log("Splitting...");
  const splitDocs = await splitDocuments(docs);

  console.log(`Created ${splitDocs.length} chunks.`);

  const before = await prisma.langchainDocument.count();

  const batchSize = 25;

  console.log("Uploading...");

  for (let i = 0; i < splitDocs.length; i += batchSize) {
    const batch = splitDocs.slice(i, i + batchSize);

    console.log(
      `Batch ${i / batchSize + 1} / ${Math.ceil(
        splitDocs.length / batchSize
      )}`
    );

    await vectorStore.addDocuments(batch);

    console.log(
      `Inserted ${Math.min(
        i + batchSize,
        splitDocs.length
      )}/${splitDocs.length}`
    );
  }

  const after = await prisma.langchainDocument.count();

  console.log(
    `Inserted ${after - before} documents`
  );

  console.log("Done ✅");
  process.exit(1)
}

ingest()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });