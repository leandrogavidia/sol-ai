import Image from "next/image"
import Link from "next/link"

export function Header() {
    return (
        <header className="w-full">
            <div className="flex justify-between gap-x-4 items-center p-4 border-b border-zinc-900">
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

                <nav>
                    <ul className="flex justify-center gap-x-3 items-center font-semibold">
                        <li>
                            <Link href="/">
                                Demo
                            </Link>
                        </li>
                        <li>
                            <Link href="#">
                                Roadmap
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}