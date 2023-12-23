import { DeleteProject } from "@/app/(dash)/_components/DeleteProject";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SlidersHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProjectCardProps {
  id: string;
  title: string;
  numOfQuestions: number;
  topic: string;
  author: {
    username: string;
    image: string | null | undefined;
  };
  whereClause?: string;
  currentUserProjectIds: { projectId: string }[];
  innerRef?: React.Ref<HTMLParagraphElement>;
}

export const ProjectCard = ({
  id,
  title,
  numOfQuestions,
  topic,
  author,
  whereClause,
  currentUserProjectIds,
  innerRef,
}: ProjectCardProps) => {
  const getStatus = (
    projectId: string,
    currentUserProjectIds: { projectId: string }[]
  ): string => {
    return currentUserProjectIds?.some(
      (project) => project.projectId === projectId
    )
      ? "Already taken"
      : "Untouched yet";
  };

  return (
    <div
      className="flex flex-col border-2 border-mainLightBlue bg-white p-1 rounded-sm"
      ref={innerRef}
    >
      <div className="p-2 rounded-sm h-full w-full ">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold max-w-[200px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[450px] truncate mr-5">
            {title}
          </h1>
          {whereClause === "dashboard" ? (
            <div className="flex items-center gap-2 max-w-[150px]">
              <Link href={`/dashboard/create-project?edit=true&projectId=${id}`}>
                <SlidersHorizontal className="text-muted-foreground h-5" />
              </Link>
              <DeleteProject projectId={id} />
            </div>
          ) : (
            <div className="flex items-center gap-2 max-w-[150px] mb-2.5 sm:mb-0">
              <Image
                src={author.image ? author.image : "/questionMark.png"}
                width={30}
                height={30}
                alt="user-image"
                className="rounded-full"
              />
              <p className="text-sm truncate">{author.username}</p>
            </div>
          )}
        </div>
        <ul className="ml-5 mt-2 list-disc space-y-1.5">
          <li className="text-sm text-muted-foreground">
            {numOfQuestions === 1
              ? `${numOfQuestions} Question`
              : `${numOfQuestions} Questions`}
          </li>
          <li className="text-sm text-muted-foreground break-words max-w-[200px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[450px]">
            Topic: {topic}
          </li>
          <li className="text-sm text-muted-foreground">
            Status: {getStatus(id, currentUserProjectIds)}
          </li>
        </ul>
      </div>
      <Link
        href={`/quizzes/${id}`}
        className={cn(
          buttonVariants({ variant: "normal" }),
          "flex items-center justify-center self-center"
        )}
      >
        Take Quiz
      </Link>
    </div>
  );
};
