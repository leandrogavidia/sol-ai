import type { Metadata } from "next";
import { Footer } from "./components/footer";
import "./globals.css";
import "./blink.css";
import { Header } from "./components/header";
import Providers from "./components/providers";
import localFont from "next/font/local";

const diatype = localFont({
  src: [
    {
      path: "../public/fonts/diatype/ABCDiatype-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/diatype/ABCDiatype-ThinItalic.woff2",
      weight: "100",
      style: "italic",
    },
    {
      path: "../public/fonts/diatype/ABCDiatype-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/diatype/ABCDiatype-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/diatype/ABCDiatype-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/diatype/ABCDiatype-RegularItalic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/diatype/ABCDiatype-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/diatype/ABCDiatype-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/diatype/ABCDiatype-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/diatype/ABCDiatype-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-diatype",
});

export const metadata: Metadata = {
  title: "Sol AI",
  description: "AI-powered solana virtual assistant.",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["solana", "sol ai", "blinks", "ai"],
  icons: [
    { rel: "apple-touch-icon", url: "/sol-ai-logo.png" },
    { rel: "icon", url: "/sol-ai-logo.png" },
  ],
  twitter: {
    card: "summary_large_image",
    site: "@_sol_ai",
    creator: "@_sol_ai",
    title: "Sol AI",
    description: "AI-powered solana virtual assistant.",
    images: {
      url: "/thumbnail.png",
      alt: "Sol AI",
      username: "@_sol_ai",
      width: 1920,
      height: 1080,
      type: "image/png",
    },
  },
  openGraph: {
    title: "Sol AI",
    description: "AI-powered solana virtual assistant.",
    url: "https://sol-ai.app/",
    type: "website",
    locale: "en",
    siteName: "Sol AI",
    images: {
      url: "/thumbnail.png",
      alt: "Sol AI",
      width: 1920,
      height: 1080,
      type: "image/png",
    },
  },
};

export const viewport = {
  minimumScale: 1,
  initialScale: 1,
  width: "device-width",
  shrinkToFit: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${diatype.variable} antialiased`}
      >
        <Providers>
        <Header />
        <main className="font-diatype w-full h-full px-5 min-h-screen-minus-190 md:px-10">{children}</main>
        <Footer />
        </Providers>
      </body>
    </html>
  );
}
