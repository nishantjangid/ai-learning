import dotenv from "dotenv";
import {todaysWeather} from './functions.js'
dotenv.config({ path: "../.env" });

import OpenAI from "openai";
import GLOBAL from "../shared/envs_enum.js";

const client = new OpenAI({
  apiKey: GLOBAL.GROQ_API_KEY,
  baseURL: GLOBAL.GROQ_API_URL
});

async function main(){
    // MESSAGE WHICH PROVIDED BY USER
    const messages = [
        {
            role: 'user',
            content: 'What is the Ajmer city weather today'
        }
    ]

    // tools
    const tools = [{
        type:'function',
        function:{
            name: 'todaysWeather',
            description: 'Get the todays weather information for a specific city',
            parameters:{
                type:'object',
                properties: {
                    city: {
                        type: 'string',
                        description: 'The name of the city to get weather for'
                    }
                },
                required: ['city']  // This parameter is mandatory
            }
        }
    }]

    const response = await client.chat.completions.create({
        model: GLOBAL.model,
        messages,
        tools
    })

    console.log(`Initial Response:`, response.choices[0]);
    console.log(`Tool Called:`, response.choices[0].message.tool_calls);

    // Handle tool call
    if(response.choices[0].finish_reason === 'tool_calls'){
        const toolCall = response.choices[0].message.tool_calls[0];
        console.log(`\nExecuting: ${toolCall.function.name}`);
        
        // Parse the arguments that LLM extracted
        const args = JSON.parse(toolCall.function.arguments);
        console.log(`Arguments:`, args);
        
        // Call the weather function with the extracted city parameter
        const weatherData = await todaysWeather(args.city);
        console.log(`\nWeather Data:`, weatherData);
        
        // Add this to messages to get final response
        messages.push(response.choices[0].message);
        messages.push({
            role: 'tool',
            tool_call_id: toolCall.id,
            content: JSON.stringify(weatherData)
        });

        // Get final formatted response from LLM
        const finalResponse = await client.chat.completions.create({
            model: GLOBAL.model,
            messages
        });

        console.log(`\nFinal Answer:`, finalResponse.choices[0].message.content);
    }

}

main()