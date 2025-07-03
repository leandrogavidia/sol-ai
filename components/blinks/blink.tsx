import "@dialectlabs/blinks/index.css";

import {
    Blink as DefaultBlink,
    useBlink,
} from "@dialectlabs/blinks";

import { useBlinkSolanaWalletAdapter } from "@dialectlabs/blinks/hooks/solana";

export function Blink() {
    const blinkApiUrl = "";

    const { adapter } = useBlinkSolanaWalletAdapter("");

    const { blink, isLoading } = useBlink({ url: blinkApiUrl });

    if (isLoading || !blink) return null;

    return <DefaultBlink stylePreset="x-dark" blink={blink} adapter={adapter} />;
}