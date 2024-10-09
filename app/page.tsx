"use client";

import { useState } from "react";
import { Chat } from "./components/chat";
import Image from "next/image";
import { useChat } from "ai/react";

export default function Home() {
  const [model, setModel] = useState("gpt-4o-mini");
  const {
    messages,
    input,
    isLoading,
    setMessages,
    handleInputChange,
    handleSubmit,
    append,
    setInput,
  } = useChat({
    api: `api/${model}`,
  });

  const {
    messages: solAiMessages,
    input: solAiInput,
    isLoading: solAiIsLoading,
    setMessages: solAiSetMessages,
    handleInputChange: SolAiHandleInputChange,
    handleSubmit: solAiHandleSubmit,
    append: solAiAppend,
    setInput: solAiSetInput,
  } = useChat({
    api: `api/sol-ai`,
  });

  const models = [
    {
      value: "gemini",
      label: "Gemini",
    },
    {
      value: "gpt-4o-mini",
      label: "gpt-4o-mini",
    },
  ];

  return (
    <div className="w-full h-full p-4 mx-auto grid grid-cols-1 md:grid-cols-2 row-auto border rounded-2xl border-zinc-900 px-4 gap-6">
      <div className="hidden w-full h-full md:flex flex-col justify-start items-center gap-y-6">
        <select
          onChange={(e) => {
            setMessages([])
            solAiSetMessages([])
            setModel(e.target.value)
          }}
          name="model"
          id="model"
          defaultValue="gpt-4o-mini"
          className="min-h-11 bg-transparent border border-zinc-900 rounded-md p-2 cursor-pointer w-full font-semibold"
        >
          {models.map(({ label, value }) => (
            <option className="text-black" key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <Chat
          model={model}
          append={append}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          input={input}
          isLoading={isLoading}
          messages={messages}
          setMessages={setMessages}
          secondHandleInputChange={SolAiHandleInputChange}
          secondHandleSubmit={solAiHandleSubmit}
          setInput={setInput}
          secondSetInput={solAiSetInput}
          secondSetMessages={solAiSetMessages}
          secondAppend={solAiAppend}
        />
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
        <Chat
          model="sol-ai"
          append={solAiAppend}
          handleInputChange={SolAiHandleInputChange}
          handleSubmit={solAiHandleSubmit}
          input={solAiInput}
          isLoading={solAiIsLoading}
          messages={solAiMessages}
          secondHandleInputChange={handleInputChange}
          secondHandleSubmit={handleSubmit}
          setMessages={solAiSetMessages}
          setInput={solAiSetInput}
          secondSetInput={setInput}
          secondSetMessages={setMessages}
          secondAppend={append}
        />
      </div>
    </div>
  );
}
