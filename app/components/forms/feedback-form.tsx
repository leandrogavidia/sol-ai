"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { cn } from "@/app/lib/utils";
import { Spinner } from "../spinner";
import { useSession } from "next-auth/react";

type FeedbackType = "New feature" | "UI/UX" | "New project" | "Error" | "Other";
enum FeedbackStatus {
  DEFAULT = "DEFAULT",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

interface Feedback {
  title: string;
  feedback: string;
  type: FeedbackType;
}

export function FeedbackForm() {
  const { data: session } = useSession()
  const [status, setStatus] = useState<FeedbackStatus>(FeedbackStatus.DEFAULT);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const schema = z.object({
    title: z.string().min(1, "Title is required"),
    feedback: z.string().min(1, "Feedback is required"),
    type: z.string().min(1, "Type is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<Feedback>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async ({ title, feedback, type }: Feedback) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          feedback,
          type,
          email: session?.user?.email,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus(FeedbackStatus.SUCCESS);
        setMessage(data.message);
        reset()
      } else {
        setStatus(FeedbackStatus.ERROR);
        setMessage(data.message);
      }
    } catch (e) {
      console.error("Error:", e);
      setStatus(FeedbackStatus.ERROR);
      setMessage((e as Error).message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-start justify-center gap-y-5 w-full"
    >
      <div className="flex flex-col items-start justify-center gap-y-2 w-full">
        <label htmlFor="title" className="text-md font-medium">
          Title
        </label>
        <input
          {...register("title", { required: true })}
          type="text"
          id="title"
          name="title"
          title="Title"
          className="w-full rounded-md bg-zinc-900 min-h-9 px-2 text-white"
          placeholder="e.g. New feature..."
        />
        <span className="text-red-600">
          {errors && errors.title ? `* ${errors.title.message}` : ""}
        </span>
      </div>
      <div className="flex flex-col items-start justify-center gap-y-2 w-full">
        <label htmlFor="feedback" className="text-md font-medium">
          Feedback
        </label>
        <textarea
          {...register("feedback", { required: true })}
          id="feedback"
          name="feedback"
          title="Feedback"
          className="w-full rounded-md bg-zinc-900 p-2 resize-none min-h-36"
          placeholder="It would be cool if you added the following feature to Sol AI..."
        ></textarea>
        <span className="text-red-600">
          {errors && errors.feedback ? `* ${errors.feedback.message}` : ""}
        </span>
      </div>
      <div className="flex flex-col items-start justify-center gap-y-2 w-full">
        <label htmlFor="type" className="text-md font-medium">
          Type
        </label>
        <select
          {...register("type", { required: true })}
          defaultValue="New feature"
          name="type"
          id="type"
          title="Type"
          className="w-full rounded-md bg-zinc-900 min-h-9 px-2 text-white cursor-pointer"
        >
          <option value="New feature">New feature</option>
          <option value="UI/UX">UX/UI</option>
          <option value="New project">New project</option>
          <option value="Error">Error</option>
          <option value="Other">Other</option>
        </select>
        <span className="text-red-600">
          {errors && errors.type ? `* ${errors.type.message}` : ""}
        </span>
      </div>
      <button
        className={cn(
          "w-full min-h-10 rounded-md border-solana-purple  font-semibold  transition-all hover:opacity-80 px-2 py-2 text-white",
          isLoading
            ? "bg-gray-800  cursor-default pointer-events-none select-none"
            : "bg-solana-purple  border-2"
        )}
      >
        {isLoading ? (
          <div className="flex justify-center items-center gap-x-3">
            <Spinner />
            <p>Sending...</p>
          </div>
        ) : (
          "Send"
        )}
      </button>

      {message && (
        <span
          className={cn(
            "mt-4 mx-auto text-sm font-semibold",
            status === FeedbackStatus.SUCCESS && "text-solana-green",
            status === FeedbackStatus.ERROR && "text-red-600"
          )}
        >
          {message}
        </span>
      )}
    </form>
  );
}
