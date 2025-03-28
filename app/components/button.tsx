import { MouseEventHandler, ReactNode } from "react";
import { cn } from "../lib/utils";

interface Button {
  children: ReactNode;
  type: "button" | "reset" | "submit";
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export function Button({
  children,
  type,
  className = "",
  onClick,
  ...props
}: Button) {
  return (
    <button
      className={cn(
        "min-w-24 max-w-max min-h-7 py-2 rounded-full text-lg font-normal border border-white max transition-all",
        className
      )}
      type={type}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}