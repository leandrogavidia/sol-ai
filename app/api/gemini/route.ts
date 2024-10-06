import { createGoogleGenerativeAI, google } from "@ai-sdk/google";
import { convertToCoreMessages, streamText } from "ai";

export const maxDuration = 30;
export const runtime = "edge";

if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    throw new Error("Missing environment variables, check the .env.example file")
}

export async function POST(request: Request) {
        const { messages } = await request.json();

        createGoogleGenerativeAI({
            apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
        });
    
        const result = await streamText({
            model: google("models/gemini-1.5-pro-latest"),
            messages: convertToCoreMessages(messages),
            maxTokens: 4096,
            temperature: 0.7,
            topP: 0.40,
            topK: 32
          });
      
          return result.toAIStreamResponse();
}