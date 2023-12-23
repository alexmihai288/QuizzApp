import { Skeleton } from "@/components/ui/skeleton";

export const ProjectsFeedSkeleton = ({}) => {
  return (
    <>
      <div className="border-2 border-mainLightBlue p-1 rounded-sm">
        <div className="p-2 rounded-sm bg-white">
          <h1 className="font-semibold">
            <Skeleton className="w-[80%] h-4" />
          </h1>
          <ul className="ml-5 mt-2 list-disc space-y-1.5">
            <li className="text-sm text-muted-foreground">
              <Skeleton className="w-[50%] h-4" />
            </li>
            <li className="text-sm text-muted-foreground">
              <Skeleton className="w-[80%] h-4" />
            </li>
            <li className="text-sm text-muted-foreground">
              <Skeleton className="w-[40%] h-4" />
            </li>
            <Skeleton className="w-[20%] h-9 mx-auto mt-2" />
          </ul>
        </div>
      </div>{" "}
      <div className="border-2 border-mainLightBlue p-1 rounded-sm">
        <div className="p-2 rounded-sm bg-white">
          <h1 className="font-semibold">
            <Skeleton className="w-[80%] h-4" />
          </h1>
          <ul className="ml-5 mt-2 list-disc space-y-1.5">
            <li className="text-sm text-muted-foreground">
              <Skeleton className="w-[50%] h-4" />
            </li>
            <li className="text-sm text-muted-foreground">
              <Skeleton className="w-[80%] h-4" />
            </li>
            <li className="text-sm text-muted-foreground">
              <Skeleton className="w-[40%] h-4" />
            </li>
            <Skeleton className="w-[20%] h-9 mx-auto mt-2" />
          </ul>
        </div>
      </div>{" "}
      <div className="border-2 border-mainLightBlue p-1 rounded-sm">
        <div className="p-2 rounded-sm bg-white">
          <h1 className="font-semibold">
            <Skeleton className="w-[80%] h-4" />
          </h1>
          <ul className="ml-5 mt-2 list-disc space-y-1.5">
            <li className="text-sm text-muted-foreground">
              <Skeleton className="w-[50%] h-4" />
            </li>
            <li className="text-sm text-muted-foreground">
              <Skeleton className="w-[80%] h-4" />
            </li>
            <li className="text-sm text-muted-foreground">
              <Skeleton className="w-[40%] h-4" />
            </li>
            <Skeleton className="w-[20%] h-9 mx-auto mt-2" />
          </ul>
        </div>
      </div>
      <div className="border-2 border-mainLightBlue p-1 rounded-sm">
        <div className="p-2 rounded-sm bg-white">
          <h1 className="font-semibold">
            <Skeleton className="w-[80%] h-4" />
          </h1>
          <ul className="ml-5 mt-2 list-disc space-y-1.5">
            <li className="text-sm text-muted-foreground">
              <Skeleton className="w-[50%] h-4" />
            </li>
            <li className="text-sm text-muted-foreground">
              <Skeleton className="w-[80%] h-4" />
            </li>
            <li className="text-sm text-muted-foreground">
              <Skeleton className="w-[40%] h-4" />
            </li>
            <Skeleton className="w-[20%] h-9 mx-auto mt-2" />
          </ul>
        </div>
      </div>
    </>
  );
};
