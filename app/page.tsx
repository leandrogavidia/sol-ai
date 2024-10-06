"use client"

import { useState } from "react";
import { Chat } from "./components/chat";

export default function Home() {
  const [model, setModel] = useState("gpt-4o-mini")

  return (
    <div className="w-full h-full p-4 mx-auto grid grid-cols-1 row-auto border rounded-2xl border-zinc-900 px-4 gap-y-6">
      <select 
        onChange={e => setModel(e.target.value)} 
        name="model" 
        id="model" 
        defaultValue="gpt-4o-mini"
        className="bg-transparent border border-zinc-900 rounded-md p-2 cursor-pointer"
      >
        <option value="gemini" className="text-black">
          Gemini
        </option>
        <option value="gpt-4o-mini" selected className="text-black">gpt-4o-mini</option>
      </select>
      <Chat model={model} />
    </div>
  );
}
