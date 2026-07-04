# ChatGPT Learning

This repository contains hands-on examples for LLM workflows, plus a current RAG assistant project under [projects/aws-learning-rag-assistent](projects/aws-learning-rag-assistent).

## Repository Overview

### Learning examples
- [01_Token](01_Token) - token counting and tokenizer basics
- [02_embeddings](02_embeddings) - embedding concepts and similarity examples
- [03_function_calling](03_function_calling) - function calling with an LLM
- [04_weather_agent_app](04_weather_agent_app) - a weather assistant using tool calling
- [05_weather_multi_agents](05_weather_multi_agents) - multi-agent orchestration

### Main application
- [projects/aws-learning-rag-assistent](projects/aws-learning-rag-assistent) - a retrieval-augmented generation app for AWS documentation

## RAG Assistant Project

The RAG project uses:
- PostgreSQL with pgvector for vector storage
- Prisma for database access
- Ollama embeddings via the `nomic-embed-text` model
- Groq/OpenAI-compatible chat completions for answer generation
- PDF ingestion for document indexing

### Project structure

```text
projects/aws-learning-rag-assistent/
├── index.js
├── package.json
├── docker-compose.yml
├── prisma/
│   └── schema.prisma
├── src/
│   ├── index.js
│   ├── config/
│   ├── scripts/
│   └── services/
└── assets/
```

## Prerequisites

- Node.js 18 or newer
- Docker Desktop
- Ollama running locally with the `nomic-embed-text` model available
- A `.env` file with the required environment variables, loaded through a shared helper in the project config

## Setup

1. Change into the project folder:
   ```bash
   cd projects/aws-learning-rag-assistent
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on your environment:
   ```env
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/aws_rag
   GROQ_API_KEY=your_groq_api_key
   GROQ_API_URL=https://api.groq.com/openai/v1
   MODEL=openai/gpt-oss-120b
   OLLAMA_URL=http://localhost:11434
   ```
   The app reads these values through the shared environment helper in [projects/aws-learning-rag-assistent/src/config/env.js](projects/aws-learning-rag-assistent/src/config/env.js).
4. Start PostgreSQL:
   ```bash
   npm run db:up
   ```
5. Push the Prisma schema:
   ```bash
   npx prisma generate
   npx prisma db push
   ```
6. Ingest the PDF document:
   ```bash
   npm run ingest
   ```
7. Start the chat app:
   ```bash
   npm start
   ```

## Available Scripts

From [projects/aws-learning-rag-assistent/package.json](projects/aws-learning-rag-assistent/package.json):

```bash
npm start          # start the chat app
npm run dev        # start the chat app with tsx
npm run ingest     # ingest the PDF into PostgreSQL
npm run db:up      # start the PostgreSQL container
npm run db:down    # stop the PostgreSQL container
npm run db:logs    # follow database logs
npm run db:reset   # restart the database container
npm run up:all     # start the database and launch the app
```

## Usage Notes

- The app prompts you with “Ask AWS Question:” and uses semantic search over stored document chunks.
- The ingestion step stores chunks and embeddings in the `document_chunks` table.
- The app uses a shared environment helper for `.env` loading, so configuration is centralized and easier to maintain.
- If the database is not running, the app will fail with a Prisma connection error until `npm run db:up` succeeds.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## License

MIT
