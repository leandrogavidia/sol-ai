import "@dialectlabs/blinks/index.css";

import {
    Blink as DefaultBlink,
    useBlink,
} from "@dialectlabs/blinks";

import { useBlinkSolanaWalletAdapter } from "@dialectlabs/blinks/hooks/solana";
import { BlinkSkeleton } from "./blink-skeleton";
import { config } from "@/lib/config";

export function Blink({
    blinkApiUrl
}: {
    blinkApiUrl: string
}) {
    const { adapter } = useBlinkSolanaWalletAdapter(config.rpcUrl);

    const { blink, isLoading } = useBlink({ url: blinkApiUrl });

    if (isLoading || !blink) return <BlinkSkeleton />;

    return <DefaultBlink stylePreset="x-dark" blink={blink} adapter={adapter} />;
}