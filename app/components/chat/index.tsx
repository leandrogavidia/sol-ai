'use client';

import { useChat } from 'ai/react';
import Image from "next/image";
import styles from "./styles.module.css";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import { Gemini } from '../icons/gemini';
import { Gpt4oMini } from '../icons/gpt-4o-mini';
import { randomString } from '@/app/lib/random-string';

export function Chat({ model }: { model: string }) {
  const { messages, input, isLoading, setMessages, handleInputChange, handleSubmit, append } = useChat({
    api: `api/${model}`
  });

  const suggestedQuestions = [
    "¿Qué es el proyecto Local Solana?",
    "¿Qué es el token ORE?",
    "¿Qué es Solana Allstars?",
    "¿Qué es La Familia?",
    "¿Qué es Heavy Duty Builders?",
    "¿Qué comunidades me recomiendas para aprender a programar en Solana y sobre DeFi?"
  ]

  return (
    <div className="flex flex-col justify-between items-center gap-y-4 w-full min-h-72">
      <div className="min-h-[340px] max-h-[340px] w-full flex flex-col items-start justify-start overflow-auto gap-y-4">
        {
          messages.length > 0 ? (
            <>
              {messages.map(m => {
                const isAssistant = m.role !== "user";
                const assistantImage = model === "gemini" ? <Gemini /> : model === "gpt-4o-mini" ? <Gpt4oMini /> : <Image
                  alt="Sol AI"
                  title="Sol AI"
                  src="/solana.svg"
                  width={16}
                  height={16}
                />

                return (
                  <div className='flex justify-start items-start gap-x-2' key={m.id}>
                    {
                      isAssistant ? assistantImage : <Image src="/user.png" width={16} height={16} alt="User" title="User" />
                    }
                    <span className="-mt-1">
                      <ReactMarkdown remarkPlugins={[remarkGfm]} className={styles.markdown}>
                        {m.content}
                      </ReactMarkdown>
                    </span>
                  </div>
                )
              }

              )}
            </>
          ) : (
            <div className="flex flex-col justify-center items-center gap-y-3 w-full max-w-[66%] mx-auto">
              {
                suggestedQuestions.map(question => (
                  <button key={question} className="cursor-pointer bg-black border w-full border-zinc-900 rounded-md p-2 text-white flex justify-center items-center" onClick={() =>
                    append({
                      content: question,
                      role: "user",
                      createdAt: new Date(),
                      id: randomString(7)
                    })
                  }>
                    {question}
                  </button>
                ))
              }
            </div>
          )
        }

      </div>

      <form className="w-full flex justify-start items-center gap-x-2" onSubmit={handleSubmit}>
        <button onClick={() => setMessages([])} className="h-full w-12 rounded-lg flex justify-center items-center border boder-zinc-900" type='button'>
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
          placeholder={isLoading ? "Enviando..." : "Escribe tu mensaje..."}
          onChange={handleInputChange}
          disabled={isLoading}
        />
      </form>
    </div>
  );
}