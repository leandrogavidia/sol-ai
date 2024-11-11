"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Spinner } from "../spinner";
import { cn, createHash } from "@/app/lib/utils";
import { useRouter } from "next/navigation";

enum SignUpFormStatus {
  DEFAULT = "DEFAULT",
  NOT_FOUND = "NOT_FOUND",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

interface SignUpForm {
  email: string;
  password: string;
  confirmPassword: string;
}

export function SignUpForm() {
  const router = useRouter();

  const [status, setStatus] = useState<SignUpFormStatus>(
    SignUpFormStatus.DEFAULT
  );
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const schema = z.object({
    email: z.string().min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string().min(1, "You must confirm your password"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async ({ email, password, confirmPassword }: SignUpForm) => {
    setIsLoading(true);
    if (password !== confirmPassword) {
      setStatus(SignUpFormStatus.ERROR);
      setMessage("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/whitelist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
      const data = await res.json();

      if (res.status === 200) {
        const encryptedPassword = await createHash(password.trim());
        const resSignUp = await fetch("/api/sign-up", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password: encryptedPassword,
          }),
        });

        const userData = await resSignUp.json();

        if (resSignUp.status === 201) {
          setStatus(SignUpFormStatus.SUCCESS);
          setMessage(userData.message); 
          router.push("/login");
          reset();
        } else if (resSignUp.status === 200) {
          setStatus(SignUpFormStatus.SUCCESS);
          setMessage(userData.message); 
        } else {
          setStatus(SignUpFormStatus.ERROR);
          setMessage(userData.message); 
        }
      } else if (res.status === 404) {
        setStatus(SignUpFormStatus.NOT_FOUND);
        setMessage(data.message);
      } else {
        setStatus(SignUpFormStatus.ERROR);
        setMessage(data.message);
      }
    } catch (e) {
      console.error("Error:", e);
      setStatus(SignUpFormStatus.ERROR);
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
        <label htmlFor="email" className="text-md font-medium">
          Email
        </label>
        <input
          {...register("email", { required: true })}
          type="email"
          id="email"
          name="email"
          title="Email"
          className="w-full rounded-md bg-zinc-900 min-h-9 px-2 text-white"
          placeholder="Your email"
        />
        <span className="text-red-600">
          {errors && errors.email ? `* ${errors.email.message}` : ""}
        </span>
      </div>
      <div className="flex flex-col items-start justify-center gap-y-2 w-full">
        <label htmlFor="password" className="text-md font-medium">
          Password
        </label>
        <input
          {...register("password", { required: true })}
          type="password"
          id="password"
          name="password"
          title="password"
          className="w-full rounded-md bg-zinc-900 min-h-9 px-2 text-white"
          placeholder="Your password"
        />
        <span className="text-red-600">
          {errors && errors.password ? `* ${errors.password.message}` : ""}
        </span>
      </div>
      <div className="flex flex-col items-start justify-center gap-y-2 w-full">
        <label htmlFor="confirmPassword" className="text-md font-medium">
          Confirm password
        </label>
        <input
          {...register("confirmPassword", { required: true })}
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          title="Confirm password"
          className="w-full rounded-md bg-zinc-900 min-h-9 px-2 text-white"
          placeholder="Confirm your password"
        />
        <span className="text-red-600">
          {errors && errors.confirmPassword
            ? `* ${errors.confirmPassword.message}`
            : ""}
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
            <p>Creating...</p>
          </div>
        ) : (
          "Create account"
        )}
      </button>
      {message && (
        <span
          className={cn(
            "mt-4 mx-auto text-sm font-semibold",
            status === SignUpFormStatus.SUCCESS && "text-solana-green",
            status === SignUpFormStatus.ERROR ||
              status === SignUpFormStatus.NOT_FOUND
              ? "text-red-600"
              : ""
          )}
        >
          {message}
        </span>
      )}
    </form>
  );
}
