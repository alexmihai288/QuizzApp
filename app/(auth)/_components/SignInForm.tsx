"use client";

import { Button } from "@/components/ui/button";
import { InputWrapper } from "./InputWrapper";
import { useShowPassword } from "@/hooks/use-show-pass";
import { Eye, EyeOff, Mail } from "lucide-react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import {
  SignInAccountRequest,
  SignInAccountValidator,
} from "@/lib/validators/SignInAccountValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import SignGoogle from "./SignGoogle";
import Link from "next/link";

interface SignInFormProps {
  signInError?: string;
}

export const SignInForm = ({ signInError }: SignInFormProps) => {
  const { isOpen } = useShowPassword();
  const [loginError, setLoginError] = useState<string | undefined>("");

  const router = useRouter();
  useEffect(() => {
    if (signInError && signInError.trim() !== "") {
      router.push("/sign-in");
      setLoginError(signInError);
    }
  }, [signInError, router]);

  useEffect(() => {
    if (loginError && loginError.trim() !== "") {
      toast.error(loginError);
    }
  }, [loginError]);

  const { mutate: signInAccount, isPending } = useMutation({
    mutationFn: async (payload: SignInAccountRequest) => {
      signIn("credentials", { ...payload, callbackUrl: "/dashboard" });
    },
    onError: () => {
      toast.error("Something went wrong...");
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInAccountRequest>({
    resolver: zodResolver(SignInAccountValidator),
  });
  return (
    <form
      className="bg-white rounded-sm p-10"
      onSubmit={handleSubmit((e) => signInAccount(e))}
    >
      <h1 className="text-3xl text-center font-bold text-mainOrange mb-20">
        Sign <span className="text-mainLightBlue">in !</span>
      </h1>

      <div className="space-y-5 max-w-sm">
        <InputWrapper
          placeholder="Email"
          className="placeholder:text-muted-foreground h-full"
          type="text"
          name="email"
          register={register}
          error={errors.email}
          icon={<Mail className="text-mainOrange" />}
        />
        <InputWrapper
          placeholder="Password"
          className="placeholder:text-muted-foreground h-full"
          type={isOpen ? "text" : "password"}
          fixedType="password"
          name="password"
          register={register}
          error={errors.password}
          icon={
            isOpen ? (
              <Eye className="text-mainOrange" />
            ) : (
              <EyeOff className="text-mainOrange" />
            )
          }
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-5 justify-end mt-20 mb-5">
        <SignGoogle label="Sign in with" />
        <Button variant="normal" isLoading={isPending}>
          Sign in
        </Button>
      </div>
      <Link
        href="/sign-up"
        className="text-mainLightBlue underline underline-offset-8 text-sm flex justify-end"
      >
        Don&apos;t have an account?
      </Link>
    </form>
  );
};
