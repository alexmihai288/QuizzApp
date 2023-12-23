import React from "react";
import { ProjectCard } from "../../(quizz)/_components/ProjectCard";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/lib/db";

interface ProjectsFeedProps {
  userId: string;
}

export const UserProjectsFeed = async ({ userId }: ProjectsFeedProps) => {
  const currentUserFinishedProjectIds = await db.finishedProjects.findMany({
    where: {
      userId,
    },
    select: {
      projectId: true,
    },
  });
  const quizzes = await db.project.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      questions: {
        select: {
          id: true,
        },
      },
      user: {
        select: {
          username: true,
          image: true,
        },
      },
    },
  });

  return (
    <div className="pt-10 sm:p-10 md:p-20 grid grid-rows-1 sm:grid-cols-2 gap-x-5 gap-y-10">
      {quizzes.map((quizz) => (
        <ProjectCard
          currentUserProjectIds={currentUserFinishedProjectIds}
          author={quizz.user}
          key={quizz.id}
          id={quizz.id}
          title={quizz.title}
          numOfQuestions={quizz.questions.length}
          topic={quizz.topic}
          whereClause="dashboard"
        />
      ))}
    </div>
  );
};

UserProjectsFeed.Skeleton = function UserProjectsFeedSkeleton() {
  return (
    <div className="pt-10 sm:p-10 md:p-20 grid grid-rows-1 sm:grid-cols-2 gap-x-5 gap-y-10">
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
    </div>
  );
};
