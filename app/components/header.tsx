"use client";

import Image from "next/image";
import Link from "next/link";
import { SolanaWalletButton } from "./wallet";
import { signOut, useSession } from "next-auth/react";

export function Header() {
  const { data: session, status } = useSession();
  return (
    <header className="w-full mb-10">
      <div className="flex justify-between gap-x-4 items-center p-4 border-b border-zinc-900">
        <Link href={status === "authenticated" ? "/early-access" : "/"} className="flex flex-col justify-center items-start gap-y-2">
          <Image
            src="/logo.png"
            width={854}
            height={210}
            title="Logo"
            alt="Logo"
            className="cursor-pointer max-w-20 h-auto w-full"
          />

          {
            status === "authenticated" && (
              <span>{session.user?.email}</span>
            )
          }
        </Link>


        <div className="flex justify-end items-center gap-x-4">
          <nav>
            {status === "authenticated" ? (
              <ul className="flex justify-center gap-x-3 items-center">
                <li>
                  <Link
                    className="text-white underline hover:text-solana-green transition-all"
                    href="/early-access/"
                  >
                    Chat
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-white underline hover:text-solana-green transition-all"
                    href="/early-access/feedback"
                  >
                    Feedback
                  </Link>
                </li>
                <li>
                  <p className="text-white underline hover:text-solana-green transition-all cursor-pointer" onClick={() => {
                    signOut();
                    
                  }}>Sign out</p>
                </li>
              </ul>
            ) : status === "loading" ? (
              ""
            ) : (
              <ul className="flex justify-center gap-x-3 items-center">
                <li>
                  <Link className="text-white underline hover:text-solana-green transition-all" href="/login">
                    Login
                  </Link>
                </li>
                <li>
                  <Link className="text-white underline hover:text-solana-green transition-all" href="/sign-up">
                    Sign Up
                  </Link>
                </li>
              </ul>
            )}
          </nav>

          {
            status === "authenticated" && (
              <SolanaWalletButton />
            )
          }
        </div>
      </div>
    </header>
  );
}
