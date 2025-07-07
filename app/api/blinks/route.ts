const SOL_AI_API = process.env.SOL_AI_API || "";
const SOL_AI_API_KEY = process.env.SOL_AI_API_KEY || "";

if (!SOL_AI_API || !SOL_AI_API_KEY) {
    throw new Error("Missing environment variables, check the .env.example file");
}

export async function POST(req: Request) {
    try {
        const { query } = await req.json();

        const response = await fetch(`${SOL_AI_API}/search/blinks`, {
            method: "POST",
            body: JSON.stringify({
                query
            }),
            headers: {
                "Content-Type": "application/json",
                "X-API-Key": SOL_AI_API_KEY
            }
        })
        const data = await response.json()
        const blinks = data.results

        return Response.json(
            { blinks, success: true },
            { status: 200 }
        );
    } catch (e) {
        console.error("Error:", e)
        return Response.json(
            { message: e, result: null, success: false },
            { status: 500 }
        );
    }
}
