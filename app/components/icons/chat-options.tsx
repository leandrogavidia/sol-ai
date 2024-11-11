import { cn } from "@/app/lib/utils"
import { MouseEventHandler } from "react"

export function ChatOptions({ className, onClick }: { className?: string, onClick: MouseEventHandler<HTMLDivElement> | undefined }) {
    return (
        <div onClick={onClick} className={cn("flex justify-center items-center gap-x-1", className)}>
            <span className="size-1.5 rounded-full bg-white"></span>
            <span className="size-1.5 rounded-full bg-white"></span>
            <span className="size-1.5 rounded-full bg-white"></span>
        </div>
    )
}