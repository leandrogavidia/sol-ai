import type { Metadata } from "next";
import localFont from "next/font/local";
// import { Header } from "./components/header";
import { Footer } from "./components/footer";
// import Providers from "./components/providers";
import "./globals.css";
import "./blink.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Sol AI",
  description: "AI-powered solana virtual assistant",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "next14", "pwa", "next-pwa"],
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "/sol-ai-logo.png" },
    { rel: "icon", url: "/sol-ai-logo.png" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <Providers> */}
        {/* <Header /> */}
        <main className="w-full h-full px-4">{children}</main>
        <Footer />
        {/* </Providers> */}
      </body>
    </html>
  );
}
