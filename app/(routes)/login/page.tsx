import { LoginForm } from "@/app/components/forms/login-form"
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function Login() {
    const session = await auth();
    
    if (session) {
      redirect("/");
    }
    
    return (
        <section className="mx-auto max-w-[600px] w-full">
            <h1 className="text-4xl font-bold mb-5">Login</h1>
            <LoginForm />
        </section>
    )
}