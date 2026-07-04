import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { PDFParse } from "pdf-parse";

// Get absolute path of current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolve absolute path to the PDF file
const pdfPath = path.resolve(__dirname, "../../assets/aws-overview.pdf");

// Check if file exists
if (!fs.existsSync(pdfPath)) {
  console.error(`Error: PDF file not found at ${pdfPath}`);
  console.log(`Please ensure the file exists at: ${pdfPath}`);
  process.exit(1);
}

async function extractPDFText() {
  try {
    const dataBuffer = fs.readFileSync(pdfPath);
    const uint8Array = new Uint8Array(dataBuffer);
    const pdfData = new PDFParse(uint8Array);
    console.log(pdfData, "------- pdfData -----------");
    const text = await pdfData.getText();
    console.log(text, "--------- content ------------\n");
  } catch (error) {
    console.error("Error parsing PDF:", error.message);
    process.exit(1);
  }
}

extractPDFText();
