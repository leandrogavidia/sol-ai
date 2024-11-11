import { Chat } from "@/app/components/chat"
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function EarlyAccess() {
    const session = await auth();
    
    if (!session) {
      redirect("/");
    }
  
    return (
        <section>
            <Chat />
        </section>
    )
}