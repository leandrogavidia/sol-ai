"use client"

import Link from "next/link";
import { Discord } from "./icons/discord";
import { X } from "./icons/x";
import { Instagram } from "./icons/instagram";
import { GitHub } from "./icons/github";
import { config } from "@/lib/config";
import { usePathname } from "next/navigation";

function BaseFooter() {
  const socialMedia = [
    {
      link: config.socialMedia.x,
      icon: <X className="fill-white hover:fill-solana-purple transition-colors" />
    },
    {
      link: config.socialMedia.github,
      icon: <GitHub className="fill-white hover:fill-solana-purple transition-colors" />
    },
    {
      link: config.socialMedia.discord,
      icon: <Discord className="fill-white hover:fill-solana-purple transition-colors" />
    },
    {
      link: config.socialMedia.instagram,
      icon: <Instagram className="fill-white hover:fill-solana-purple transition-colors" />
    },
  ]
  return (
    <footer className="px-6 py-12 max-w-7xl mx-auto border-t border-gray-800 relative mt-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex justify-start items-center gap-x-2">
          <img
            src="/images/brand/logo.png"
            width={854}
            height={210}
            title="Logo"
            alt="Logo"
            className="max-w-10 h-auto w-full"
          />
          <span className="font-normal text-sm">© 2025 Sol AI</span>
        </div>
        <ul className="flex justify-center items-center gap-x-5">
          {
            socialMedia.map(({ link, icon }) => (
              <li key={link}>
                <Link href={link} target="_blank">
                  <span className="[&>svg]:h-5 [&>svg]:w-5">
                    {icon}
                  </span>
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    </footer>
  );
}

export function Footer() {
  const pathname = usePathname();

  if (pathname === "/chat") {
    return null;
  }

  return <BaseFooter />;
}