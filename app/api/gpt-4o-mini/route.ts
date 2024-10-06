import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextRequest } from "next/server";
import { Configuration, OpenAIApi } from "openai-edge";

export const runtime = "edge";

if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing environment variables, check the .env.example file")
}

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(config)

export async function POST(request: NextRequest) {
        const { messages } = await request.json();

        const response = await openai.createChatCompletion({
            model: "gpt-4o-mini",
            stream: true,
            messages,
            max_tokens: 1024,
            temperature: 0.7,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        })
    
        const stream = OpenAIStream(response);
        return new StreamingTextResponse(stream)
}