import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Sol AI",
        short_name: "Sol AI",
        description: "AI-powered Solana virtual assistant.",
        theme_color: "#14F195",
        background_color: "#000000",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/",
        icons: [
            {
                "src": "/images/brand/sol-ai-logo.png",
                "sizes": "280x280",
                "type": "image/png",
            }
        ],
    }
}