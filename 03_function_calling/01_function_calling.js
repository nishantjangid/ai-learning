import dotenv from "dotenv";
import {getActiveUsersToday} from './function.js'
dotenv.config({ path: "../.env" });

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});

// TOOLS 
const tools = [{
    type: 'function',
    function: {
        name: 'getActiveUsersToday',
        description: 'Get active monly user',
        parameters:{
            type: 'object',
            properties: {

            }
        }
    }
}]

async function main(){
    const messages = [{
        role:'user',
        content:'How many active users today?'
    }];

    const response = await client.chat.completions.create({
        model: process.env.model,
        messages,
        tools
    })

    console.log("Initial Response:", response.choices[0]);
    console.log("Tools:", response.choices[0].message.tool_calls);

    // Check if tool call is requested
    if(response.choices[0].finish_reason === 'tool_calls'){
        const toolCall = response.choices[0].message.tool_calls[0];
        console.log("\nTool Called:", toolCall.function.name);

        // Execute the tool
        let toolResult;
        if(toolCall.function.name === 'getActiveUsersToday'){
            toolResult = await getActiveUsersToday();
        }

        console.log("Tool Result:", toolResult);

        // Add assistant response and tool result to messages
        messages.push(response.choices[0].message);
        messages.push({
            role: 'tool',
            tool_call_id: toolCall.id,
            content: JSON.stringify(toolResult)
        });

        // Make follow-up request with tool result
        const finalResponse = await client.chat.completions.create({
            model: process.env.model,
            messages
        });

        console.log("\nFinal Response:", finalResponse.choices[0].message.content);
    }
}

main()