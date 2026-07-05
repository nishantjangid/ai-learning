import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export async function loadPDF(path) {
  const loader = new PDFLoader(path);
  return await loader.load();
}
