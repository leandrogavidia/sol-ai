// "use client";

// import { ChangeEvent, FormEvent } from "react";
// import { Chat } from "./components/chat";
import Image from "next/image";
import Link from "next/link";
// import { useActionSolanaWalletAdapter } from "@dialectlabs/blinks/hooks/solana";

export default function Home() {
  // const { adapter } = useActionSolanaWalletAdapter(
  //   process.env.NEXT_PUBLIC_RPC || ""
  // );

  return (
    <div className="w-full h-full p-4 mx-auto flex flex-col text-center justify-center items-center px-4">
      <Image
        src="/logo.png"
        width={854}
        height={210}
        title="Logo"
        alt="Logo"
        className="cursor-pointer max-w-36 h-auto w-full"
      />
      <div className="mt-6">
        <h1 className="text-2xl font-semibold">The AI of Solana</h1>
        <h2 className="text-lg">AI-powered Solana virtual assistant</h2>
      </div>
      <div className="flex justify-center items-center gap-x-5 mt-8">
        <Link
          href="https://drive.google.com/file/d/1NIviRcoH2NS4yvge6yWiQzOCaLRLl0YL/view"
          target="_blank"
        >
          <button className="border border-white text-white flex justify-center items-center min-h-10 px-4 py-2 rounded-md transition-all font-semibold hover:bg-white hover:text-black ">
            Watch video demo
          </button>
        </Link>
        <Link href="https://forms.gle/zpT1tK7KKXeiSzCh8" target="_blank">
          <button className="border border-white text-black bg-white flex justify-center items-center min-h-10 px-4 py-2 rounded-md transition-all font-semibold hover:bg-transparent hover:text-white ">
            Get early access
          </button>
        </Link>
      </div>
      {/* <div className="w-full h-full flex flex-col justify-start items-center gap-y-6">
        <div className="min-h-11 bg-transparent border border-zinc-900 rounded-md p-2 w-full flex justify-start gap-x-3 items-center">
          <Image
            alt="Sol AI"
            title="Sol AI"
            src="/solana.svg"
            width={16}
            height={16}
          />
          <span className="font-semibold">Sol AI</span>
        </div>
        <Chat
          model="sol-ai"
          adapter={adapter}
        />
      </div> */}
    </div>
  );
}
