"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useMemo, useState } from "react";
import { BlinkMessage } from "../blink-message";
import { useChat } from "ai/react";
import { cn, randomString } from "@/app/lib/utils";
import { useActionSolanaWalletAdapter } from "@dialectlabs/blinks/hooks/solana";
import { ChatOptions } from "../icons/chat-options";
import { Trash } from "../icons/trash";
import { BlinkMessageList } from "../blink-message-list";

export function Chat() {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const { adapter } = useActionSolanaWalletAdapter(
    process.env.NEXT_PUBLIC_RPC || ""
  );
  const {
    messages,
    input,
    isLoading,
    setMessages,
    handleInputChange,
    handleSubmit,
    append,
    setInput,
    stop,
  } = useChat({
    api: `api/sol-ai`,
    maxSteps: 3,
  });

  const suggestedQuestions = [
    "What is the Local Solana project",
    "What is the ORE token?",
    "What is Solana Allstars?",
    "What is La Familia?",
    "What is Heavy Duty Builders?",
    "What communities do you recommend to learn how to program and about DeFi",
  ];

  const filteredMessages = useMemo(() => {
    return messages.filter(
      (m) =>
        m.content ||
        (m.toolInvocations && m.toolInvocations[0].toolName != "getAsset")
    );
  }, [messages]);

  return (
    <div className="flex flex-col justify-between items-center gap-y-4 w-full min-h-72 max-w-[724px] mx-auto">
      <div className="flex justify-between items-center gap-x-5 w-full mb-5">
        <div className="flex justify-start items-center gap-x-3">
          <Image
            alt="Sol AI"
            title="Sol AI"
            src="/solana.svg"
            width={24}
            height={24}
          />
          <span className="font-semibold text-lg">Sol AI</span>
        </div>
        <div className="relative">
          <ChatOptions
            className="cursor-pointer"
            onClick={() => setOptionsOpen(!optionsOpen)}
          />
          <ul
            className={cn(
              "absolute top-4 right-0 bg-zinc-950 border border-zinc-900 min-h-max min-w-max px-4 py-2 rounded-lg cursor-pointer",
              optionsOpen ? "block" : "hidden"
            )}
          >
            <li
              onClick={() => {
                setInput("");
                setMessages([]);
                setOptionsOpen(false);
              }}
              className="flex justify-start items-center gap-x-2"
            >
              <Trash className="fill-red-600" />
              <span className="text-red-600">Clear chat</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="min-h-[340px] max-h-[340px] w-full flex flex-col items-start justify-start overflow-auto gap-y-4">
        {messages.length > 0 ? (
          <>
            {filteredMessages.map((m) => {
              const isAssistant = m.role !== "user";

              return (
                <div
                  key={m.id}
                  className="flex flex-row justify-start items-start gap-x-6 w-full"
                >
                  <div className="flex justify-start items-start gap-x-2">
                    {isAssistant ? (
                      <Image
                        alt="Sol AI"
                        title="Sol AI"
                        src="/solana.svg"
                        width={16}
                        height={16}
                      />
                    ) : (
                      <Image
                        src="/user.png"
                        width={16}
                        height={16}
                        alt="User"
                        title="User"
                      />
                    )}
                    <span className="-mt-1">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        className={styles.markdown}
                      >
                        {m.content}
                      </ReactMarkdown>
                    </span>
                  </div>

                  {isAssistant &&
                  m.toolInvocations &&
                  m.toolInvocations[0].toolName === "getBlink" ? (
                    <BlinkMessage message={m} adapter={adapter} />
                  ) : null}

                  {isAssistant &&
                  m.toolInvocations &&
                  m.toolInvocations[0].toolName === "recommendBlinks" &&
                  'result' in m.toolInvocations[0]  ? (
                    <BlinkMessageList message={m} adapter={adapter} />
                  ) : null}
                </div>
              );
            })}
          </>
        ) : (
          <div className="flex flex-col justify-center items-center gap-y-3 w-full max-w-[66%] mx-auto">
            {suggestedQuestions.map((question) => ( 
              <button
                type="button"
                key={question}
                className="cursor-pointer bg-black border w-full border-zinc-900 rounded-md p-2 text-white flex justify-center items-center"
                onClick={() =>
                  append({
                    content: question,
                    role: "user",
                    createdAt: new Date(),
                    id: randomString(7),
                  })
                }
              >
                {question}
              </button>
            ))}
          </div>
        )}
      </div>

      <form
        className="w-full flex justify-start items-center gap-x-2"
        onSubmit={handleSubmit}
      >
        <div className="w-full border border-zinc-900 rounded-md px-2 py-1 bg-transparent min-h-10 flex justify-between items-center gap-x-5">
          <input
            className={cn(
              "outline-none w-full bg-transparent p-2 text-white resize-none h-10",
              isLoading && "select-none pointer-events-none cursor-default"
            )}
            value={input}
            placeholder={isLoading ? "Sending..." : "Type your message..."}
            onChange={handleInputChange}
            disabled={isLoading}
          />
          <div
            onClick={() => stop()}
            className={cn(
              "p-1 justify-center items-center min-h-7 min-w-7 rounded-full bg-solana-purple cursor-pointer",
              isLoading ? "flex" : "hidden"
            )}
          >
            <div className="size-3 bg-white"></div>
          </div>
        </div>
      </form>
    </div>
  );
}
