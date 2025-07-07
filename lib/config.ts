const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || "";

if (!rpcUrl) {
    throw new Error("Missing environment variables, check the .env.example file");
}

export const config = {
    socialMedia: {
        discord: "https://discord.gg/W79E4GqXyX",
        x: "https://x.com/solailabs_",
        github: "https://github.com/Sol-AI-Lab",
        instagram: "https://instagram.com/_sol_ai"
    },
    rpcUrl
}