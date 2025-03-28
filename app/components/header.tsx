"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./button";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

export function Header() {
  const { status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="w-full mb-10 p-5 pb-0 md:p-10 md:pb-0">
      <div className="flex justify-between gap-x-4 items-center">
        <div className="flex flex-col justify-center items-start gap-y-2">
          <Link href="/">
            <Image
              src="/logo.png"
              width={854}
              height={210}
              title="Logo"
              alt="Logo"
              className="cursor-pointer max-w-20 h-auto w-full"
              priority
            />
          </Link>
        </div>

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
                <div className="flex justify-center items-center gap-x-5">
                  <Link href="/login">
                    <Button type="button" className="hover:bg-white hover:text-black">Login</Button>
                  </Link>
                  <Link href="/sign-up">
                    <Button type="button" className="bg-white text-black hover:text-white hover:bg-transparent">Sign Up</Button>
                  </Link>
                </div>
              )}
      </div>
    </header>
  );
}
