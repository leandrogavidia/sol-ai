import Link from "next/link";
import { Discord } from "./icons/discord";
import { X } from "./icons/x";
import { Instagram } from "./icons/instagram";
import Image from "next/image";

export function Footer() {
  const socialMedia = [
    {
      link: "https://x.com/_sol_ai",
      icon: <X className="fill-white" />
    },
    {
      link: "https://discord.gg/qZZBnbgb",
      icon: <Discord className="fill-white" />
    },
    {
      link: "https://instagram.com/_sol_ai",
      icon: <Instagram className="fill-white" />
    },
  ]
  return (
    <footer className="w-full px-5 pt-0 pb-14 flex flex-col gap-y-10 justify-center items-start">
      <div className="flex justify-start items-center gap-x-2">
        <Image
          src="/logo.png"
          width={854}
          height={210}
          title="Logo"
          alt="Logo"
          className="cursor-pointer max-w-10 h-auto w-full"
          priority
        />
        <span className="font-normal text-sm">© 2025 Sol AI</span>
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
    </footer>
  );
}
