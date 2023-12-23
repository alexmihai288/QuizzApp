import { FC, Suspense } from "react";
import { getAuthSession } from "@/lib/auth";
import { UserProjectsFeed } from "../_components/UserProjectsFeed";
import Link from "next/link";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const session = await getAuthSession();

  return (
    <div className="min-h-screen bg-mainOrange">
      <div className="container">
        <div className="pt-20 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="font-bold text-white text-xl">
            Dashboard{" "}
            <span className="font-normal text-mainLightBlue">
              | Your Projects{" "}
            </span>
          </h1>
          <div className="flex items-center gap-5">
            <Link
              href="/quizzes"
              className={cn(buttonVariants({ variant: "normal" }))}
            >
              Explore more
            </Link>
            <Link
              href="/dashboard/create-project"
              className={cn(
                buttonVariants(),
                "bg-white text-black hover:bg-slate-100 active:scale-95 transition-transform"
              )}
            >
              <Plus className="text-mainLightBlue mr-2" /> Create new
            </Link>
          </div>
        </div>
        <Suspense fallback={<UserProjectsFeed.Skeleton />}>
          <UserProjectsFeed userId={session?.user?.id!} />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
