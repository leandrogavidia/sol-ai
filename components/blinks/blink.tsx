import "@dialectlabs/blinks/index.css";

import {
    Blink as DefaultBlink,
    useBlink,
} from "@dialectlabs/blinks";

import { useBlinkSolanaWalletAdapter } from "@dialectlabs/blinks/hooks/solana";
import { BlinkSkeleton } from "./blink-skeleton";

export function Blink({
    blinkApiUrl
}: {
    blinkApiUrl: string
}) {
    const { adapter } = useBlinkSolanaWalletAdapter("https://mainnet.helius-rpc.com/?api-key=22a5a327-77fd-4021-b6d3-2d1ccb26fb18");

    const { blink, isLoading } = useBlink({ url: blinkApiUrl });

    if (isLoading || !blink) return <BlinkSkeleton />;

    return <DefaultBlink stylePreset="x-dark" blink={blink} adapter={adapter} />;
}