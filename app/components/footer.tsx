import Link from "next/link"

export function Footer() {
    return (
        <footer className="w-full p-4 border-t border-zinc-900 flex justify-center items-center">
            <p>Obtén acceso temprano a Sol AI fase beta <Link href="https://forms.gle/VW7eGsVbgMGzReoV6" target="_blank" className="text-[#0000ff] underline font-medium">aquí</Link></p>
        </footer>
    )
}