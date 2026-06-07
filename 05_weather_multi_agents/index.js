import dotenv from "dotenv";
import { todaysWeather, convertTemperature } from "./functions.js";
dotenv.config({ path: "../.env" });

import OpenAI from "openai";
import GLOBAL from "../shared/envs_enum.js";

const client = new OpenAI({
  apiKey: GLOBAL.GROQ_API_KEY,
  baseURL: GLOBAL.GROQ_API_URL,
});

async function main() {
  // TOOLS - Multiple agents
  const tools = [
    {
      type: "function",
      function: {
        name: "todaysWeather",
        description: "Get the current weather information for a specific city",
        parameters: {
          type: "object",
          properties: {
            city: {
              type: "string",
              description: "The name of the city to get weather for",
            },
          },
          required: ["city"],
        },
      },
    },
    {
      type: "function",
      function: {
        name: "convertTemperature",
        description: "Convert temperature from Celsius to Fahrenheit",
        parameters: {
          type: "object",
          properties: {
            celsius: {
              type: "number",
              description: "Temperature in Celsius",
            },
          },
          required: ["celsius"],
        },
      },
    },
  ];

  // MESSAGE
  const messages = [
    {
      role: "user",
      content: "What is the weather in New York and convert the temperature to Fahrenheit",
    },
  ];

  console.log("=== MULTI-AGENT WEATHER SYSTEM ===\n");
  console.log(`User Query: ${messages[0].content}\n`);

  // Agent loop - handle multiple tool calls
  let weatherData = null;
  let isRunning = true;

  while (isRunning) {
    const response = await client.chat.completions.create({
      model: GLOBAL.model,
      messages,
      tools,
    });

    console.log("Assistant Response:", response.choices[0].message.content || "Processing...");

    // Check if tool call is needed
    if (response.choices[0].finish_reason === "tool_calls") {
      const toolCalls = response.choices[0].message.tool_calls;
      console.log(`\nTools Called: ${toolCalls.map((t) => t.function.name).join(", ")}`);

      // Add assistant message to history
      messages.push(response.choices[0].message);

      // Process each tool call
      for (const toolCall of toolCalls) {
        console.log(`\n→ Executing: ${toolCall.function.name}`);

        const args = JSON.parse(toolCall.function.arguments);
        console.log(`  Arguments:`, args);

        let toolResult;

        // Execute the appropriate tool
        if (toolCall.function.name === "todaysWeather") {
          toolResult = await todaysWeather(args.city);
          weatherData = toolResult;
          console.log(`  Result:`, toolResult);
        } else if (toolCall.function.name === "convertTemperature") {
          toolResult = await convertTemperature(args.celsius);
          console.log(`  Result:`, toolResult);
        }

        // Add tool result to messages
        messages.push({
          role: "tool",
          tool_call_id: toolCall.id,
          content: JSON.stringify(toolResult),
        });
      }
    } else {
      // No more tool calls needed - get final response
      isRunning = false;
      console.log(`\n=== FINAL RESPONSE ===`);
      console.log(response.choices[0].message.content);
    }
  }
}

main().catch(console.error);
