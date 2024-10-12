"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Gemini } from "../icons/gemini";
import { Gpt4oMini } from "../icons/gpt-4o-mini";
import { UserChat } from "./types";
import { useMemo } from "react";
import { BlinkMessage } from "../blink-message";

export function Chat({
  input,
  isLoading,
  messages,
  model,
  clearMessages,
  handleAppend,
  changeInput,
  clearInput,
  submitMessage,
  adapter,
}: UserChat) {
  const suggestedQuestions = [
    "What is the Local Solana project",
    "What is the ORE token?",
    "What is Solana Allstars?",
    "What is La Familia?",
    "What is Heavy Duty Builders?",
    "What communities do you recommend to learn how to program and about DeFi",
  ];

  const assistantImage = useMemo(() => {
    if (model === "gemini") {
      return <Gemini />;
    } else if (model === "gpt-4o-mini") {
      return <Gpt4oMini />;
    } else {
      return (
        <Image
          alt="Sol AI"
          title="Sol AI"
          src="/solana.svg"
          width={16}
          height={16}
        />
      );
    }
  }, [model]);

  const filteredMessages = useMemo(() => {
    return messages.filter(
      (m) =>
        m.content ||
        (m.toolInvocations && m.toolInvocations[0].toolName != "getAsset")
    );
  }, [messages]);

  return (
    <div className="flex flex-col justify-between items-center gap-y-4 w-full min-h-72">
      <div className="min-h-[340px] max-h-[340px] w-full flex flex-col items-start justify-start overflow-auto gap-y-4">
        {messages.length > 0 ? (
          <>
            {filteredMessages.map((m) => {
              const isAssistant = m.role !== "user";

              return (
                <div
                  key={m.id}
                  className="flex flex-row justify-start items-start gap-x-6 w-full [&>div:nth-child(2)]:w-full [&>div:nth-child(2)]:pr-6"
                >
                  <div className="flex justify-start items-start gap-x-2">
                    {isAssistant ? (
                      assistantImage
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

                  {model === "sol-ai" &&
                  isAssistant &&
                  m.toolInvocations &&
                  m.toolInvocations[0].toolName === "getBlink" ? (
                    <BlinkMessage message={m} adapter={adapter} />
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
                onClick={() => handleAppend(question)}
              >
                {question}
              </button>
            ))}
          </div>
        )}
      </div>

      <form
        className="w-full flex justify-start items-center gap-x-2"
        onSubmit={(e) => submitMessage(e)}
      >
        <button
          onClick={() => {
            clearInput();
            clearMessages();
          }}
          className="h-full w-12 rounded-lg flex justify-center items-center border boder-zinc-900"
          type="button"
        >
          <Image
            alt="Trash"
            title="Trash"
            src="/trash.svg"
            width={16}
            height={16}
          />
        </button>
        <input
          className="w-full bg-transparent border border-zinc-900 rounded-md p-2 text-white"
          value={input}
          placeholder={isLoading ? "Sending..." : "Type your message..."}
          onChange={(e) => changeInput(e)}
          disabled={isLoading}
        />
      </form>
    </div>
  );
}
