import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export function Header() {
  return (
    <header className="w-full mb-10">
      <nav className="relative z-50 flex items-center justify-between p-6 max-w-7xl mx-auto">
        <Link href="/">
          <Image
            src="/images/brand/logo.png"
            width={854}
            height={210}
            title="Logo"
            alt="Logo"
            className="cursor-pointer max-w-16 h-auto w-full"
            priority
          />
        </Link>

        <Badge variant="outline" className="border-[var(--solana-purple)]/30 text-[var(--solana-purple)] h-8">
          Soon public beta
        </Badge>
      </nav>
    </header>
  );
}
