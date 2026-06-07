# ChatGPT Learning

A comprehensive learning repository for working with OpenAI's GPT models and the GROQ API. This project demonstrates key concepts including tokenization, embeddings, and function calling.

## Project Structure

```
ChatGPT_Learning/
├── 01_Token/
│   └── tokenizer.js                 # Token counting and analysis
├── 02_embeddings/
│   └── 01_embeddings.js             # Text embeddings and vector operations
├── 03_function_calling/
│   ├── 01_function_calling.js       # Single tool function calling
│   └── function.js                  # Tool implementations
├── 04_weather_agent_app/
│   ├── index.js                     # Weather app with function calling
│   └── functions.js                 # Weather API integration
├── 05_weather_multi_agents/
│   ├── index.js                     # Multi-agent weather system
│   └── functions.js                 # Weather & temperature conversion agents
├── weather_chatgpt_app/
│   ├── index.js                     # Basic weather chatbot
│   └── functions.js                 # Weather function
├── shared/
│   └── envs_enum.js                 # Centralized environment variables
├── package.json                     # Dependencies
└── .env                             # API keys (not included in repo)
```

## Prerequisites

- Node.js (v16 or higher)
- API keys:
  - `GROQ_API_KEY` - GROQ API key for LLM access
  - `GROQ_API_URL` - GROQ API base URL
  - `weatherApiKey` - WeatherAPI.com API key
  - `weatherApiBaseUrl` - WeatherAPI.com base URL
  - `model` - Model name (e.g., "openai/gpt-oss-120b")

## Setup

1. Clone or download the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with your API keys:
   ```
   GROQ_API_KEY=your_groq_api_key_here
   GROQ_API_URL=https://api.groq.com/openai/v1
   model=openai/gpt-oss-120b
   weatherApiKey=your_weatherapi_key_here
   weatherApiBaseUrl=https://api.weatherapi.com/v1
   ```

## Code Quality & Formatting

This project uses **ESLint** for code quality and **Prettier** for consistent code formatting.

### Available Scripts

```bash
npm run lint              # Check for linting errors
npm run lint:fix         # Fix linting errors automatically
npm run format           # Format all files with Prettier
npm run format:check     # Check if files are formatted correctly
npm run prepare          # Initialize Husky git hooks
```

### Git Hooks with Husky

Husky automatically runs code quality checks before every commit:

- **Pre-commit hook** runs:
  - ESLint fixes (`npm run lint:fix`)
  - Code formatting (`npm run format`)

This ensures all code is properly formatted and linted before being committed.

### Setup Husky

After cloning the repository:
```bash
npm install       # Install dependencies including Husky
```

The Husky hooks are automatically set up during `npm install`. You can also manually initialize them:
```bash
npm run prepare
```

### Formatting Rules

**Prettier Configuration:**
- Line width: 100 characters
- Tab width: 2 spaces
- Semicolons: required
- Quotes: double quotes
- Trailing commas: always in multiline objects/arrays
- Line endings: LF

**ESLint Rules:**
- ES2021+ syntax
- `const` preferred over `let`, `var` not allowed
- Proper spacing and indentation
- No trailing spaces or multiple empty lines
- Meaningful variable names (unused vars warned)
- Console logging allowed (for development)

## Modules

### 1. Tokenizer (`01_Token/`)
Learn how to count and analyze tokens for API requests and cost estimation using the OpenAI tokenizer library.

### 2. Embeddings (`02_embeddings/`)
Explore text embeddings and vector-based operations for semantic search and similarity analysis. Learn how to convert text into numerical representations.

### 3. Function Calling (`03_function_calling/`)
Implement single tool calling with the GROQ API. Learn how to define functions with parameters and handle the LLM's tool invocation requests.

### 4. Weather Agent App (`04_weather_agent_app/`)
Get weather information for any city using function calling and real-time weather data from WeatherAPI. Demonstrates how an AI agent can extract city names from user queries and fetch live weather data.

### 5. Multi-Agent Weather System (`05_weather_multi_agents/`)
Advanced system with multiple agents working together. One agent fetches weather data, another converts temperatures. Demonstrates the agent loop pattern where multiple tools can be called sequentially in a single conversation.

### 6. Basic Weather Chatbot (`weather_chatgpt_app/`)
Simple weather chatbot demonstrating basic function calling concepts. A simplified entry point for understanding how AI models can invoke functions.

## Dependencies

### Runtime
- **openai** - Official OpenAI JavaScript SDK
- **dotenv** - Environment variable management
- **groq-sdk** - GROQ API SDK
- **tiktoken** - Token counting for OpenAI models

### Development
- **eslint** - Code quality and linting
- **prettier** - Code formatting
- **husky** - Git hooks for pre-commit checks

## Usage

To run any module, use Node.js:

```bash
node <module_path>/index.js
```

Each module is self-contained and can be run independently. They all use the centralized environment variables from `shared/envs_enum.js` for API keys and configuration.

## Key Points

- API keys should never be committed to version control - use `.env` files
- All modules use centralized environment variables from `shared/envs_enum.js`
- Each module is self-contained and demonstrates different AI/LLM concepts
- The project progresses from basic tokenization to advanced multi-agent systems
- WeatherAPI.com free tier has daily limits - plan your API usage accordingly
- GROQ API provides fast LLM inference through OpenAI-compatible endpoints

## Best Practices

1. Use the centralized `GLOBAL` enum for environment variables instead of accessing `process.env` directly
2. Define clear parameter descriptions in tool definitions so the LLM can accurately extract data
3. Implement error handling for all external API calls
4. Maintain message history in arrays to preserve conversation context
5. Validate and sanitize tool results before using them in responses
6. Run `npm run lint:fix` before committing code to maintain consistency
7. Run `npm run format` to auto-format all files according to project standards

## License

MIT
