"use client"

import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Blink } from "./blink"
import { useState } from "react"

export const BlinkCarousel = ({ blinksUrl }: { blinksUrl: string[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const handleNext = () => {
        if (currentIndex < blinksUrl.length - 1) {
            setCurrentIndex((prev) => prev + 1)
        }
    }

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1)
        }
    }
    return (
        <div className="relative w-full max-w-xl mx-auto">
            <div className="flex justify-between items-center mb-6 mt-12">
                <Button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className={cn("hover:bg-gray-800/50 transition-all text-sm px-3 py-1 rounded border border-gray-700 text-white bg-black/50 disabled:opacity-30 cursor-pointer", currentIndex === 0 ? "opacity-50 cursor-default" : "")}
                >
                    ← Back
                </Button>

                <span className="text-gray-400 text-sm">
                    {currentIndex + 1} / {blinksUrl.length}
                </span>

                <Button
                    onClick={handleNext}
                    disabled={currentIndex === blinksUrl.length - 1}
                    className={cn("hover:bg-gray-800/50 transition-all text-sm px-3 py-1 rounded border border-gray-700 text-white bg-black/50 disabled:opacity-30 cursor-pointer", currentIndex === blinksUrl.length - 1 ? "opacity-50 cursor-default" : "")}
                >
                    Next →
                </Button>
            </div>

            <div className="transition-all duration-300">
                <Blink blinkApiUrl={blinksUrl[currentIndex]} />
            </div>
        </div>
    )
}