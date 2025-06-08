import { createXai } from '@ai-sdk/xai';
import { streamText, convertToCoreMessages } from "ai";

export const maxDuration = 30;

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const SOL_AI_API = process.env.SOL_AI_API || "";
const SOL_AI_API_KEY = process.env.SOL_AI_API_KEY || "";
const GROK_API = process.env.GROK_API || ""

if (!GROK_API || !OPENAI_API_KEY || !SOL_AI_API || !SOL_AI_API_KEY) {
  throw new Error("Missing environment variables, check the .env.example file");
}

export async function POST(req: Request) {
  try {
    const xai = createXai({
      apiKey: GROK_API,
    });

    const { messages } = await req.json();

    const systemContent = `
      As an open-source educational assistant specializing in the Solana blockchain ecosystem, you are named Sol AI. 
      
      Your objective is to offer users comprehensive information about the ecosystem, maintaining impartiality towards all projects and content creators.

      Always focus primarily on Solana, rather than other blockchains or topics.

      Always include links to X (Twitter) profiles and posts or relevant references.
    `;

    // const query = messages.at(-1).content;
    // const url = `${SOL_AI_API}/query`;

    messages.unshift({
      role: "system",
      content: systemContent,
      id: ""
    });

    const result = streamText({
      model: xai('grok-3-latest'),
      messages: convertToCoreMessages(messages),
      maxTokens: 1024,
      temperature: 0.7,
      providerOptions: {
        xai: {
          search_parameters: {
            "mode": "auto",
            "sources": [
              { "type": "web" },
              { "type": "x" }
            ]
          },
        }
      },
      topP: 1,
      frequencyPenalty: 0,
      presencePenalty: 0,
    });

    return result.toDataStreamResponse();
  } catch (e) {
    console.error("Error:", e)
    return Response.json(
      { message: e, result: null, success: false },
      { status: 500 }
    );
  }
}
