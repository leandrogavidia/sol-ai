'use client';

import { useChat } from 'ai/react';
import Image from "next/image";
import styles from "./styles.module.css";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import { Gemini } from '../icons/gemini';
import { Gpt4oMini } from '../icons/gpt-4o-mini';

export function Chat({ model }: { model: string }) {
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        api: `api/${model}`
    });
    return (
        <div className="flex flex-col justify-between items-center gap-y-4 w-full min-h-72">
            <div className="w-full flex flex-col items-start justify-start overflow-auto gap-y-4">
                {messages.map(m => {
                    const isAssistant = m.role !== "user";
                    const assistantImage = model === "gemini" ? <Gemini/> : <Gpt4oMini />

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
            </div>

            {/* {messages.map((message: Message) => {
          
          return (
            <div key={message.id}>
              <p className="flex justify-start gap-x-3 items-start">
                {isAssistant ? (
                  <Image
                    src="/cd-logo.svg"
                    alt="Curadeuda Logo"
                    title="Curadeuda Logo"
                    width={20}
                    height={20}
                  />
                ) : (
                  <Image
                    src="/user.svg"
                    alt="User"
                    title="User"
                    width={20}
                    height={20}
                  />
                )}
                <span
                  className={`${
                    isAssistant ? "text-[#008A76]" : "text-[#24272A]"
                  }`}
                >
                  {message.content}
                </span>
              </p>
            </div>
          );
        })} */}

            <form className="w-full" onSubmit={handleSubmit}>
                <input
                    className="w-full bg-transparent border border-zinc-900 rounded-md p-2 text-white"
                    value={input}
                    placeholder="Escribe tu mensaje..."
                    onChange={handleInputChange}
                />
            </form>
        </div>
    );
}