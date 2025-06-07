"use client";
import dynamic from "next/dynamic";
import { Wallet } from "lucide-react";

const CONNECT_WALLET = (
  <>
    <div className="flex flex-row items-center justify-center gap-2 text-sm font-semibold">
      <Wallet className="size-4" />
      Connect wallet
    </div>
  </>
);
const LABELS = {
  "change-wallet": "Change wallet",
  connecting: "Connecting...",
  "copy-address": "Copy address",
  copied: "Copied",
  disconnect: "Disconnect",
  "has-wallet": "Connect",
  "no-wallet": CONNECT_WALLET,
} as const;

const BaseWalletMultiButton = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).BaseWalletMultiButton,
  { ssr: false }
);

export const SolanaWalletButton = () => {
  return (
    <div className={"flex max-h-10 min-h-10 items-center justify-center relative z-50"}>
      {/*@ts-expect-error labels type*/}
      <BaseWalletMultiButton labels={LABELS} />
    </div>
  );
};
