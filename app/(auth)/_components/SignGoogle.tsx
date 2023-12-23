"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { FC } from "react";

interface SignGoogleProps {
  label?: string;
}

export const SignGoogle: FC<SignGoogleProps> = ({ label }) => {
  return (
    <Button
      type="button"
      variant="signInNormalOutline"
      onClick={() => signIn("google", { callbackUrl: "/quizzes" })}
    >
      {label}
      <Image
        className="ml-2"
        src="/Glogo.svg"
        alt="Glogo"
        width={20}
        height={20}
      />
    </Button>
  );
};

export default SignGoogle;
