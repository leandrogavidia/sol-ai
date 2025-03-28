import { RightArrow } from "./icons/right-arrow";

export function ContextOption({ text }: { text: string }) {
    return (
        <div className="flex justify-start items-center gap-x-3 cursor-pointer [&_svg]:hover:fill-solana-green">
            <RightArrow className="fill-white transition-all"></RightArrow>
            <p className="text-xl font-medium">{text}</p>
        </div>
    );
}