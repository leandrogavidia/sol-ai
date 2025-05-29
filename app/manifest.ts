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
        start_url: "/chat",
        icons: [
            {
                src: '/images/brand/sol-ai-logo.png',
                sizes: '192x192',
                type: 'image/png'
            },
            {
                src: '/images/brand/sol-ai-logo.png',
                sizes: '512x512',
                type: 'image/png'
            }
        ],
    }
}