"use client"

import { useState } from "react";
import { Plus } from "./icons/plus";
import { Minus } from "./icons/minus";

export function QuestionItem({ title, content }: { title: string, content: string }) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className="w-full flex flex-col justify-center items-start gap-y-5 border-b border-b-zinc-700 pb-3">
            <div className="w-full flex justify-between items-center gap-x-5 cursor-pointer" onClick={() => setIsOpen(!isOpen)} >
                <p className="text-xl font-medium">{title}</p>
                {
                    isOpen ? <Minus className="fill-white min-w-6 min-h-6" /> : <Plus className="fill-white min-w-6 min-h-6" />
                }
            </div>

            {
                isOpen ? <p className="text-sm font-light text-left">{content}</p> : ""
            }
        </div>
    )
}