"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { Chat } from "./components/chat";
import Image from "next/image";
import { useChat } from "ai/react";
import { randomString } from "./lib/random-string";
import { useActionSolanaWalletAdapter } from "@dialectlabs/blinks/hooks/solana";

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

  const { adapter } = useActionSolanaWalletAdapter(
    process.env.NEXT_PUBLIC_RPC || ""
  );

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
    maxSteps: 3,
  });

  const clearMessages = () => {
    setMessages([]);
    solAiSetMessages([]);
  };

  const handleModelChange = (newModel: string) => {
    setModel(newModel);
    clearMessages();
  };

  const handleAppend = (content: string) => {
    append({
      content,
      role: "user",
      createdAt: new Date(),
      id: randomString(7),
    });

    solAiAppend({
      content,
      role: "user",
      createdAt: new Date(),
      id: randomString(7),
    });
  };

  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e);
    SolAiHandleInputChange(e);
  };

  const clearInput = () => {
    setInput("");
    solAiSetInput("");
  };

  const submitMessage = (e: FormEvent<HTMLFormElement>) => {
    handleSubmit(e);
    solAiHandleSubmit(e);
  };

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
    <div className="w-full h-full p-4 mx-auto grid grid-cols-1 sm:grid-cols-2 row-auto border rounded-2xl border-zinc-900 px-4 gap-6">
      <div className=" w-full h-full flex flex-col justify-start items-center gap-y-6">
        <select
          onChange={(e) => handleModelChange(e.target.value)}
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
          input={input}
          isLoading={isLoading}
          messages={messages}
          clearMessages={clearMessages}
          handleAppend={handleAppend}
          changeInput={changeInput}
          clearInput={clearInput}
          submitMessage={submitMessage}
          adapter={adapter}
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
          input={solAiInput}
          isLoading={solAiIsLoading}
          messages={solAiMessages}
          clearMessages={clearMessages}
          handleAppend={handleAppend}
          changeInput={changeInput}
          clearInput={clearInput}
          submitMessage={submitMessage}
          adapter={adapter}
        />
      </div>
    </div>
  );
}
