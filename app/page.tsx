"use client"

import { useState } from "react";
import { Chat } from "./components/chat";
import Image from "next/image"

export default function Home() {
  const [model, setModel] = useState("gpt-4o-mini")

  return (
    <div className="w-full h-full p-4 mx-auto grid grid-cols-1 md:grid-cols-2 row-auto border rounded-2xl border-zinc-900 px-4 gap-6">
      <div className="hidden w-full h-full md:flex flex-col justify-start items-center gap-y-6">
        <select 
          onChange={e => setModel(e.target.value)} 
          name="model" 
          id="model" 
          defaultValue="gpt-4o-mini"
          className="min-h-11 bg-transparent border border-zinc-900 rounded-md p-2 cursor-pointer w-full font-semibold"
        >
          <option value="gemini" className="text-black">
            Gemini
          </option>
          <option value="gpt-4o-mini" selected className="text-black">gpt-4o-mini</option>
        </select>
        <Chat model={model} />
      </div>

      <div className="w-full h-full flex flex-col justify-start items-center gap-y-6">
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
        <Chat model="sol-ai" />
      </div>
    </div>
  );
}
