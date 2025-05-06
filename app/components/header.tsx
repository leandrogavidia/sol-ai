import Image from "next/image";
import Link from "next/link";
import { Button } from "./button";

export function Header() {
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

        <Button type="button" className=" bg-zinc-900 border-none cursor-default select-none" title="Soon">Soon public beta</Button>

      </div>
    </header>
  );
}
