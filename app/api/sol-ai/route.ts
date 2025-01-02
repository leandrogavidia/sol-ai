import { openai } from "@ai-sdk/openai";
import { streamText, convertToCoreMessages, tool } from "ai";
import { z } from "zod";

export const runtime = "edge";
export const maxDuration = 30;

const HELIUS_RPC = process.env.HELIUS_RPC || "";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const SOL_AI_API = process.env.SOL_AI_API || "";
const SOL_AI_API_KEY = process.env.SOL_AI_API_KEY || "";

if (!OPENAI_API_KEY || !HELIUS_RPC || !SOL_AI_API || !SOL_AI_API_KEY) {
  throw new Error("Missing environment variables, check the .env.example file");
}

export async function POST(req: Request) {
  try {

    const { messages } = await req.json();
  
    let systemContent = "";
  
    const query = messages.at(-1).content;
  
    const url = `${SOL_AI_API}/query`;
    const data = { 
      query,
      collection: "solana_projects",
      n_results: 3
     };
  
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": SOL_AI_API_KEY,
      },
      body: JSON.stringify(data),
    });
  
    const resData = await res.json();
    const documents = resData.content;
  
    if (documents) {
      for (let i = 0; i < documents.length; i++) {
        systemContent += "\n" + documents[i];
      }
    }
  
    messages.unshift({
      role: "system",
      content: systemContent,
      id: ""
    });
  
    const result = streamText({
      model: openai("gpt-4o-mini"),
      messages: convertToCoreMessages(messages),
      maxTokens: 1024,
      temperature: 0.7,
      topP: 1,
      frequencyPenalty: 0,
      presencePenalty: 0,
      tools: {
        getAsset: tool({
          description: "Get the data in a Solana token by a Solana address.",
          parameters: z.object({
            asset_address: z
              .string()
              .describe(
                "Solana address to get the Solana token's data or NFTs' data for"
              ),
          }),
          execute: async ({ asset_address }) => {
            try {
              const response = await fetch(HELIUS_RPC, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  jsonrpc: "2.0",
                  id: "text",
                  method: "getAsset",
                  params: {
                    id: asset_address,
                  },
                }),
              });
  
              const data = await response.json();
              const mint_data = {
                interface: data?.result?.interface,
                metadata: data?.result?.content?.metadata,
                mint_address: data?.result?.id,
                name: data?.result?.content?.metadata?.name,
                is_mutable: data?.result?.mutable,
                is_burnt: data?.result?.burnt,
                symbol: data?.result?.token_info?.symbol,
                supply: data?.result?.token_info?.supply,
                decimals: data?.result?.token_info?.decimals,
                token_program: data?.result?.token_info?.token_program,
                mint_authority: data?.result?.token_info?.mint_authority,
                freeze_authority: data?.result?.token_info?.freeze_authority,
                price_info: data?.result?.token_info?.price_info,
              };
  
              return mint_data;
            } catch (e) {
              console.error("ERROR GETTING MINT ACCOUNT DATA", e);
              return {
                error: "Error getting mint account data. Please, try again",
              };
            }
          },
        }),
        getBlink: tool({
          description: "Get the data in a Solana Action by a Solana Action URL.",
          parameters: z.object({
            actionUrl: z
              .string()
              .describe("Solana Action URL to get data to render a blink"),
          }),
          execute: async ({ actionUrl }) => {
            try {
              const response = await fetch(actionUrl);
              const data = await response.json();
  
              return {
                actionUrl: `solana-action:${actionUrl}`,
                actionData: {
                  title: data.title,
                  description: data.description,
                  disabled: data.disabled ? true : false,
                },
              };
            } catch (e) {
              console.error("ERROR GETTING BLINK DATA", e);
            }
          },
        }),
        recommendBlinks: tool({
          description: "Recommend some Blinks based on a message.",
          parameters: z.object({
            message: z.string().describe("Message for Blinks"),
          }),
          execute: async ({ message }) => {
            try {
              const res = await fetch(`${SOL_AI_API}/query`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "X-API-Key": SOL_AI_API_KEY,
                },
                body: JSON.stringify({
                  query: message,
                  collection: "blinks",
                  n_results: 4,
                }),
              });
  
              const data = await res.json();
              const content = data.content;
  
              const actionUrlList = content
                .map((str: string) => {
                  const match = str.match(/actionUrl: (https?:\/\/[^\s\n]+)/);
                  return match ? match[1] : null;
                })
                .filter((url: string) => url !== null);
              return {
                actionUrlList,
                data,
              };
            } catch (e) {
              console.error("ERROR GETTING BLINKS DATA", e);
            }
          },
        }),
        radarHackathonProjects: tool({
          description: "Show Radar hackathon projects based on a message.",
          parameters: z.object({
            message: z.string().describe("Message for Radar hackathon projects"),
          }),
          execute: async ({ message }) => {
            try {
              const res = await fetch(`${SOL_AI_API}/query`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "X-API-Key": SOL_AI_API_KEY,
                },
                body: JSON.stringify({
                  query: message,
                  collection: "radar-hackathon-projects",
                  n_results: 20,
                }),
              });
  
              const data = await res.json();
              const content = data.content;

              return {
                content
              };
            } catch (e) {
              console.error("ERROR GETTING RADAR HACKATHON PROJECTS DATA", e);
            }
          },
        }),
        renaissanceHackathonProjects: tool({
          description: "Show Renaissance hackathon projects based on a message.",
          parameters: z.object({
            message: z.string().describe("Message for Renaissance hackathon projects"),
          }),
          execute: async ({ message }) => {
            try {
              const res = await fetch(`${SOL_AI_API}/query`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "X-API-Key": SOL_AI_API_KEY,
                },
                body: JSON.stringify({
                  query: message,
                  collection: "renaissance-hackathon-projects",
                  n_results: 20,
                }),
              });
  
              const data = await res.json();
              const content = data.content;

              return {
                content
              };
            } catch (e) {
              console.error("ERROR GETTING RENAISSANCE HACKATHON PROJECTS DATA", e);
            }
          },
        }),
      },
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
