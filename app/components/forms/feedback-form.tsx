"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type FeedbackType = "New feature" | "UI/UX" | "New project" | "Error" | "Other";

interface Feedback {
  title: string;
  feedback: string;
  type: FeedbackType;
}

export function FeedbackForm() {
  const schema = z.object({
    title: z.string().min(1, "Title is required"),
    feedback: z.string().min(1, "Feedback is required"),
    type: z.string().min(1, "Type is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Feedback>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: Feedback) => {
    console.log(data);
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
          className="w-full rounded-md bg-zinc-900 min-h-8 px-2 text-white"
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
          className="w-full rounded-md bg-zinc-900 min-h-8 px-2 text-white cursor-pointer"
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
      <button className="w-full min-h-10 rounded-md border-solana-purple border-2 text-white font-semibold bg-solana-purple transition-all hover:opacity-80">
        Send
      </button>
    </form>
  );
}
