# ChatGPT Learning

A comprehensive learning repository for working with OpenAI's GPT models and the GROQ API. This project demonstrates key concepts including tokenization, embeddings, and function calling.

## Project Structure

```
ChatGPT_Learning/
├── 01_Token/
│   └── tokenizer.js          # Token counting and analysis
├── 02_embeddings/
│   └── 01_embeddings.js      # Text embeddings and vector operations
├── 03_function_calling/
│   ├── 01_function_calling.js # Function calling with tool use
│   └── function.js           # Tool implementations
├── package.json              # Dependencies
└── .env                       # API keys (not included in repo)
```

## Prerequisites

- Node.js (v16 or higher)
- API keys:
  - GROQ_API_KEY (for GROQ API access)
  - OPENAI_API_KEY (for OpenAI API access)

## Setup

1. Clone or download the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with your API key and gpt model name:
   ```
   GROQ_API_KEY=your_groq_api_key_here
   model=gpt_model_name
   ```

## Modules

### 1. Tokenizer (`01_Token/tokenizer.js`)
Learn how to count and analyze tokens for API requests and cost estimation.

**Run:**
```bash
node 01_Token/tokenizer.js
```

### 2. Embeddings (`02_embeddings/01_embeddings.js`)
Explore text embeddings and vector-based operations for semantic search and similarity.

**Run:**
```bash
node 02_embeddings/01_embeddings.js
```

### 3. Function Calling (`03_function_calling/01_function_calling.js`)
Implement tool calling with the GROQ API, allowing AI models to invoke functions and use their outputs.

**Features:**
- Define custom tools/functions
- Handle tool calls from the model
- Execute tools and return results
- Use tool outputs in follow-up requests

**Run:**
```bash
node 03_function_calling/01_function_calling.js
```

## Dependencies

- **openai** - Official OpenAI JavaScript SDK
- **dotenv** - Environment variable management
- **groq-sdk** - GROQ API SDK
- **tiktoken** - Token counting for OpenAI models

## Usage Example

The function calling module demonstrates a complete workflow:

```javascript
// 1. Define tools
const tools = [{
    type: 'function',
    function: {
        name: 'getActiveUsersToday',
        description: 'Get active users for today',
        parameters: { type: 'object', properties: {} }
    }
}];

// 2. Make request with tools
const response = await client.chat.completions.create({
    model: "openai/gpt-oss-120b",
    messages,
    tools
});

// 3. Check if tool was called and execute it
if(response.choices[0].finish_reason === 'tool_calls'){
    // Execute the tool and return results
}
```

## Notes

- API keys should never be committed to version control
- Each module is self-contained and can be run independently
- Check the `.env` file path configuration for your setup

## License

MIT
