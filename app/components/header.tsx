"use client";

import Image from "next/image";
import Link from "next/link";
import { SolanaWalletButton } from "./wallet";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { cn } from "../lib/utils";

export function Header() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="w-full mb-10">
      <div className="flex justify-between gap-x-4 items-center p-4 border-b border-zinc-900">
        <div className="flex flex-col justify-center items-start gap-y-2">
          <Link href={status === "authenticated" ? "/early-access" : "/"}>
            <Image
              src="/logo.png"
              width={854}
              height={210}
              title="Logo"
              alt="Logo"
              className="cursor-pointer max-w-20 h-auto w-full"
            />
          </Link>
          {status === "authenticated" && <span>{session.user?.email}</span>}
        </div>

        <div className="flex justify-end items-center gap-x-2 relative">
          {isOpen ? (
            <Image
              className="relative z-50 md:hidden cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
              alt="Menu abierto"
              src={"/x-icon.svg"}
              width={32}
              height={32}
            />
          ) : (
            <Image
              className="relative z-50 md:hidden cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
              alt="Menu abierto"
              src={"/menu-icon.svg"}
              width={32}
              height={32}
            />
          )}
          {isOpen ? (
            <nav
              className={cn(
                "absolute top-12 z-50 shadow md:hidden min-w-28",
                status === "authenticated" ? "left-0" : "right-0"
              )}
            >
              {status === "authenticated" ? (
                <ul className="flex flex-col justify-center gap-3 items-start bg-zinc-900 px-4 py-3 rounded-md">
                  <li onClick={() => setIsOpen(!isOpen)}>
                    <Link
                      className="text-white underline hover:text-solana-green transition-all"
                      href="/early-access/"
                    >
                      Chat
                    </Link>
                  </li>
                  <li onClick={() => setIsOpen(!isOpen)}>
                    <Link
                      className="text-white underline hover:text-solana-green transition-all"
                      href="/early-access/feedback"
                    >
                      Feedback
                    </Link>
                  </li>
                  <li onClick={() => setIsOpen(!isOpen)}>
                    <p
                      className="text-white underline hover:text-solana-green transition-all cursor-pointer"
                      onClick={() => {
                        signOut();
                      }}
                    >
                      Sign out
                    </p>
                  </li>
                </ul>
              ) : status === "loading" ? (
                ""
              ) : (
                <ul className="flex flex-col justify-center gap-3 items-start bg-zinc-900 px-4 py-3 rounded-md">
                  <li>
                    <Link
                      className="text-white underline hover:text-solana-green transition-all"
                      href="/login"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-white underline hover:text-solana-green transition-all"
                      href="/sign-up"
                    >
                      Sign Up
                    </Link>
                  </li>
                </ul>
              )}
            </nav>
          ) : (
            ""
          )}

          <nav>
            {status === "authenticated" ? (
              <ul className="hidden md:flex justify-center gap-x-3 items-center">
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
                  <p
                    className="text-white underline hover:text-solana-green transition-all cursor-pointer"
                    onClick={() => {
                      signOut();
                    }}
                  >
                    Sign out
                  </p>
                </li>
              </ul>
            ) : status === "loading" ? (
              ""
            ) : (
              <ul className="hidden md:flex justify-center gap-x-3 items-center">
                <li>
                  <Link
                    className="text-white underline hover:text-solana-green transition-all"
                    href="/login"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-white underline hover:text-solana-green transition-all"
                    href="/sign-up"
                  >
                    Sign Up
                  </Link>
                </li>
              </ul>
            )}
          </nav>

          {status === "authenticated" && <SolanaWalletButton />}
        </div>
      </div>
    </header>
  );
}
