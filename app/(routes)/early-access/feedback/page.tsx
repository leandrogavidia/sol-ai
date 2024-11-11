import { FeedbackForm } from "@/app/components/forms/feedback-form"
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Feedback() {
    const session = await auth();
    
    if (!session) {
      redirect("/");
    }

    return (
        <section className="mx-auto max-w-[600px]">
            <h1 className="text-4xl font-bold">Let me know your experience</h1>
            <h2 className="text-xl my-5">Your feedback is really important for us to improve Sol AI. Especially since we are in closed beta phase.</h2>
            <FeedbackForm />
        </section>
    )
}