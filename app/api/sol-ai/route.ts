import { openai } from '@ai-sdk/openai';
import { streamText, convertToCoreMessages } from 'ai';

export const maxDuration = 30;
export const runtime = "edge";

if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing environment variables, check the .env.example file")
}

export async function POST(request: Request) {
    const { messages } = await request.json();

    let systemContent = "";

    const query = messages.at(-1).content;

    const url = "https://sol-ai-api.shuttleapp.rs/api/chat";
    const data = { message: query };

    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const resData = await res.json();
    console.log(resData)
    const documents = resData.content;

    systemContent += "\n\n```";

    for (let i = 0; i < documents.length; i++) {
        systemContent += "\n" + documents[i];
    }
    
    console.log("systemContent", systemContent)

    messages.push({
        role: "system",
        content: systemContent,
    });

    const result = await streamText({
        model: openai('gpt-4o-mini'),
        messages: convertToCoreMessages(messages),
    });

    return result.toDataStreamResponse();
}