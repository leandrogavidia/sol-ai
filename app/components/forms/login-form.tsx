"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Spinner } from "../spinner";
import { cn, createHash } from "@/app/lib/utils";
import { login } from "@/app/actions";
import { useRouter } from "next/navigation";

enum LoginFormStatus {
  DEFAULT = "DEFAULT",
  NOT_FOUND = "NOT_FOUND",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

interface LoginForm {
  email: string;
  password: string;
}

export function LoginForm() {
  const router = useRouter();
  const [status, setStatus] = useState<LoginFormStatus>(
    LoginFormStatus.DEFAULT
  );
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const schema = z.object({
    email: z.string().min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async ({ email, password }: LoginForm) => {
    setIsLoading(true);

    try {
      const encryptedPassword = await createHash(password.trim());

      const resUser = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password: encryptedPassword,
        }),
      });

      const userData = await resUser.json();

      if (resUser.status === 200) {
        const res = await login(email, encryptedPassword);
  
        if (res) {
          setMessage("");
          setStatus(LoginFormStatus.DEFAULT);
          reset();
          router.push("/early-access")
        }
      } else if (resUser.status === 404) {
        setStatus(LoginFormStatus.NOT_FOUND);
        setMessage(userData?.message);
      } else {
        setStatus(LoginFormStatus.ERROR);
        setMessage(userData?.message);
      }

    } catch (e) {
      console.error("Error:", e);
      setStatus(LoginFormStatus.ERROR);
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
            <p>Verifying...</p>
          </div>
        ) : (
          "Login"
        )}
      </button>
      {message && (
        <span
          className={cn(
            "mt-4 mx-auto text-sm font-semibold",
            status === LoginFormStatus.SUCCESS && "text-solana-green",
            status === LoginFormStatus.ERROR ||
              status === LoginFormStatus.NOT_FOUND
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
