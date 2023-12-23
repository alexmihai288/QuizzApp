import React from "react";
import Image from "next/image";
import { getAuthSession } from "@/lib/auth";
import { buttonVariants } from "./ui/button";
import Link from "next/link";
import { SignOut } from "@/app/(auth)/_components/SignOut";
import { cn } from "@/lib/utils";

export const Navbar = async () => {
  const session = await getAuthSession();

  return (
    <nav className="bg-mainOrange">
      <div className="container">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image
              src="/questionMark.png"
              width={100}
              height={100}
              quality={100}
              alt="logo"
            />
          </Link>
          <div className="flex items-center gap-5">
            {session?.user?.id ? (
              <div className="flex items-center gap-5">
                <Link
                  href="/dashboard"
                  className={cn(buttonVariants({ variant: "normal" }))}
                >
                  Dashboard
                </Link>
                <SignOut />
              </div>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className={buttonVariants({ variant: "normal" })}
                >
                  Sign in
                </Link>
                <Link
                  href="/sign-up"
                  className={buttonVariants({ variant: "normalOutline" })}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
