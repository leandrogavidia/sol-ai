import { SignUpForm } from "@/app/components/forms/sign-up-form"
import Link from "next/link"
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function SignUp() {
    const session = await auth();
    
    if (session) {
      redirect("/");
    }
    
    return (
        <section className="mx-auto max-w-[600px] w-full">
            <h1 className="text-4xl font-bold">Sign Up</h1>
            <h2 className="text-xl my-5">To create your account your email must be whitelisted, to request access please fill out this <Link href="https://forms.gle/zpT1tK7KKXeiSzCh8" target="_blank" className="text-solana-green underline">form</Link>.</h2>
            <SignUpForm />
        </section>
    )
}