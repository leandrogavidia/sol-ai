import Image from "next/image";
import Link from "next/link";
import { Button } from "./button";

export function Header() {
  return (
    <header className="w-full mb-10">
      <div className="flex justify-between gap-x-4 items-center p-5 pb-0">
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

        <Button type="button">Chat</Button>
      </div>
    </header>
  );
}
