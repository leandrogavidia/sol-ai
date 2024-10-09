import Link from "next/link"

export function Footer() {
    return (
        <footer className="w-full p-4 border-t border-zinc-900 flex justify-center items-center">
            <p>Get early access to Sol AI be phase <Link href="https://forms.gle/VW7eGsVbgMGzReoV6" target="_blank" className="underline font-medium">here</Link></p>
        </footer>
    )
}