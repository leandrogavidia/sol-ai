import { openai } from "@ai-sdk/openai";
import { streamText, convertToCoreMessages, tool } from "ai";
import { z } from "zod";

export const maxDuration = 30;

const HELIUS_RPC = process.env.HELIUS_RPC || "";
export const runtime = "edge";

if (!process.env.OPENAI_API_KEY || !HELIUS_RPC) {
  throw new Error("Missing environment variables, check the .env.example file");
}

export async function POST(req: Request) {
  const { messages } = await req.json();

  let systemContent = "";

  const query = messages.at(-1).content;

  const url = "https://sol-ai-api.shuttleapp.rs/api/query";
  const data = { message: query };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const resData = await res.json();
  const documents = resData.content;

  systemContent += "\n\n```";

  for (let i = 0; i < documents.length; i++) {
    systemContent += "\n" + documents[i];
  }

  messages.push({
    role: "system",
    content: systemContent,
  });

  const result = await streamText({
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
          actionUrl: z.string().describe("Solana Action URL to get data to render a blink")
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
                disabled: data.disabled ? true : false
              }
            }
          } catch (e) {
            console.error("ERROR GETTING Blink DATA", e);
          }
        }
      }),
      recommendBlinks: tool({
        description: "Recommend some Blinks based on a project name such as Metapool.",
        parameters: z.object({
          projectName: z.string().describe("Project name for Blinks")
        }),
        execute: async ({ projectName }) => {
          const blink = {
            "icon": "https://raw.githubusercontent.com/leandrogavidia/files/refs/heads/main/metapool-restaking.png",
            "title": "Restake Aggregator",
            "description": "Solana Restake Aggregator. To restake your LST tokens in Solana, such as mSOL, jitoSOL, bSOL, and receive mpSOL.",
            "label": "Restake",
            "links": {
              "actions": [
                {
                  "label": "Restake",
                  "href": "/api/restaking?amount={amount}&method=restake",
                  "parameters": [
                    {
                      "label": "Amount",
                      "name": "amount",
                      "required": false
                    }
                  ]
                }
              ]
            },
            "disabled": false,
            "error": null
          }

          return {
            actionUrl: "https://metapool-restaking-solana-action.shuttleapp.rs/api/restaking",
            blink
          }
        }
      })
    },
  });

  return result.toDataStreamResponse();
}
