import { openai } from '@ai-sdk/openai';
import { streamText, convertToCoreMessages } from 'ai';

export const maxDuration = 30;
export const runtime = "edge";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing environment variables, check the .env.example file")
}

export async function POST(request: Request) {
  const { messages } = await request.json();

  const result = await streamText({
    model: openai('gpt-4o-mini'),
    messages: convertToCoreMessages(messages),
    maxTokens: 1024,
    temperature: 0.70,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0
  });

  return result.toDataStreamResponse();
}