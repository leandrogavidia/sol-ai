import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import "./globals.css";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className="w-full h-full px-4">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
