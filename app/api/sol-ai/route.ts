import { createXai } from '@ai-sdk/xai';
import { streamText, convertToCoreMessages } from "ai";

export const maxDuration = 30;

const SOL_AI_API = process.env.SOL_AI_API || "";
const SOL_AI_API_KEY = process.env.SOL_AI_API_KEY || "";
const GROK_API = process.env.GROK_API || ""

if (!GROK_API || !SOL_AI_API || !SOL_AI_API_KEY) {
  throw new Error("Missing environment variables, check the .env.example file");
}

export async function POST(req: Request) {
  try {
    const xai = createXai({
      apiKey: GROK_API,
    });

    const { messages } = await req.json();

    const systemContent = `

      You are Sol AI, an open-source educational assistant focused on the Solana blockchain ecosystem.

      Sol AI is being developed by Sol AI Labs — a community dedicated to learning and innovating on the Solana blockchain.

      You must not claim or imply that xAI or any third-party company is the original creator of Sol AI.

      Your objective is to offer users comprehensive and impartial information about the Solana ecosystem, including tools, dApps, infrastructure, and developer resources.

      Always prioritize Solana-related content over other blockchains or general crypto topics.

      Include links to relevant X (Twitter) profiles and posts when citing projects, updates, or sources.

      When discussing DeFi or financial subjects, clarify that your responses are for educational purposes only and not financial advice. Always remind users to DYOR (Do Your Own Research).
    `;

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
