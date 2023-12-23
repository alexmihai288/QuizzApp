"use client";

import { Button } from "@/components/ui/button";
import { InputWrapper } from "./InputWrapper";
import { useShowPassword } from "@/hooks/use-show-pass";
import { Eye, EyeOff, Mail, UserRound } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SignUpAccountValidator,
  SignUpAccountRequest,
} from "@/lib/validators/SignUpAccountValidator";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import SignGoogle from "./SignGoogle";
import Link from "next/link";

export const SignUpForm = () => {
  const { isOpen } = useShowPassword();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignUpAccountRequest>({
    resolver: zodResolver(SignUpAccountValidator),
  });

  const router = useRouter();
  const { mutate: signUp, isPending } = useMutation({
    mutationFn: async ({
      username,
      email,
      password,
      confirmPassword,
    }: SignUpAccountRequest) => {
      const payload: SignUpAccountRequest = {
        username,
        email,
        password,
        confirmPassword,
      };

      const { data } = await axios.post("/api/sign-up", payload);

      return data;
    },
    onSuccess: (data) => {
      router.push("/sign-in");
      toast.success(data.msg);
    },
    onError: (error) => {
      //@ts-ignore
      toast.error(error.response.data);
    },
  });

  return (
    <form
      className="bg-white rounded-sm p-10"
      onSubmit={handleSubmit((e) => signUp(e))}
    >
      <h1 className="text-3xl text-center font-bold text-mainOrange mb-20">
        Sign <span className="text-mainLightBlue">up !</span>
      </h1>

      <div className="space-y-5">
        <InputWrapper
          placeholder="Username"
          className="placeholder:text-muted-foreground h-full"
          type="text"
          name="username"
          error={errors.username}
          icon={<UserRound className="text-mainOrange" />}
          register={register}
        />
        <InputWrapper
          placeholder="Email"
          className="placeholder:text-muted-foreground h-full"
          type="text"
          name="email"
          error={errors.email}
          icon={<Mail className="text-mainOrange" />}
          register={register}
        />
        <InputWrapper
          placeholder="Password"
          className="placeholder:text-muted-foreground h-full"
          type={isOpen ? "text" : "password"}
          fixedType="password"
          name="password"
          error={errors.password}
          icon={
            isOpen ? (
              <Eye className="text-mainOrange" />
            ) : (
              <EyeOff className="text-mainOrange" />
            )
          }
          register={register}
        />
        <InputWrapper
          placeholder="Password"
          className="placeholder:text-muted-foreground h-full"
          type={isOpen ? "text" : "password"}
          fixedType="password"
          name="confirmPassword"
          error={errors.confirmPassword}
          icon={
            isOpen ? (
              <Eye className="text-mainOrange" />
            ) : (
              <EyeOff className="text-mainOrange" />
            )
          }
          register={register}
        />
      </div>

      <div className="flex gap-5 justify-end mt-20 mb-5">
        <SignGoogle label="Sign up with" />
        <Button variant="normal" isLoading={isPending}>
          Sign up
        </Button>
      </div>
      <Link
        href="/sign-in"
        className="text-mainLightBlue underline underline-offset-8 text-sm flex justify-end"
      >
        Already have an account?
      </Link>
    </form>
  );
};
