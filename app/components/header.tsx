import Image from "next/image"
import Link from "next/link"

export function Header() {
    return (
        <header className="w-full">
            <nav className="flex justify-start items-center p-4 border-b border-zinc-900">
                <Link href="/">
                    <Image
                        src="/logo.png"
                        width={854}
                        height={210}
                        title="Logo"
                        alt="Logo"
                        className="cursor-pointer max-w-20 h-auto w-full"
                    />
                </Link>
            </nav>
        </header>
    )
}