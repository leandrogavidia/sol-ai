"use server"

import { signIn } from "@/auth";

export async function login(email: string, password: string) {
    try {
        const response = await signIn("credentials", {
            email,
            password,
            redirect: false,
        })
        return response
    } catch (e) {
        console.error("Error:", e);
        throw new Error(e instanceof Error ? e.message : String(e));
    }
}   