"use client";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { WalletError } from "@solana/wallet-adapter-base";
import { SessionProvider } from "next-auth/react";
import React, { useCallback } from "react";

// eslint-disable-next-line @typescript-eslint/no-require-imports
require("@solana/wallet-adapter-react-ui/styles.css");

if (!process.env.NEXT_PUBLIC_RPC) {
  throw new Error("Missing NEXT_PUBLIC_RPC env variables. Check .env.examples file")
}

export default function Providers(props: React.PropsWithChildren) {
  const endpoint = process.env.NEXT_PUBLIC_RPC || "";
  const onError = useCallback((error: WalletError) => {
    console.error(error);
  }, []);

  return (
    <SessionProvider>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={[]} onError={onError} autoConnect>
          <WalletModalProvider>{props.children}</WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </SessionProvider>
  );
}
