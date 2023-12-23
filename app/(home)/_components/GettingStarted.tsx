import { Button, buttonVariants } from "@/components/ui/button";
import { getAuthSession } from "@/lib/auth";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export const GettingStarted = async ({}) => {
  const session = await getAuthSession();
  return (
    <div>
      <div className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-5">
        <Link
          href="/quizzes"
          className={cn(buttonVariants({ variant: "normal" }))}
        >
          Get started
        </Link>
        {!session && (
          <Link
            className={cn(buttonVariants({ variant: "normalOutline" }))}
            href="/sign-up"
          >
            Sign up
          </Link>
        )}
      </div>

      <div className="border-2 border-mainLightBlue p-1 rounded-sm w-fit bg-white mt-20 mx-auto shadow-2xl bg-gradient-to-t from-mainLightBlue to-secondaryLightBlue">
        <Image
          className="mx-auto rounded-sm"
          src="/landing.png"
          quality={100}
          alt="questionMark"
          width={811}
          height={693}
        />
      </div>
    </div>
  );
};
