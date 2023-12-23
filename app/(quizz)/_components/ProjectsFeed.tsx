"use client";
import React, { useEffect } from "react";
import { ProjectCard } from "../../(quizz)/_components/ProjectCard";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { ProjectsFeedSkeleton } from "./ProjectsFeedSkeleton";

interface ProjectsFeedProps {
  currentUserProjectIds: { projectId: string }[];
}

export const ProjectsFeed = ({ currentUserProjectIds }: ProjectsFeedProps) => {
  const { ref, inView } = useInView();

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ["quizzes"],
      queryFn: async ({ pageParam }: { pageParam: number }) => {
        const query = `/api/quizzes?limit=4&page=${pageParam}`;

        const { data } = await axios.get(query);

        return data;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = lastPage.length ? allPages.length + 1 : undefined;
        return nextPage;
      },
    });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div className="pt-10 sm:p-10 md:p-20 grid grid-rows-1 sm:grid-cols-2 gap-x-5 gap-y-10">
      {data?.pages.map((quizzes) =>
        quizzes.map((quizz: any, i: number) => {
          if (quizzes.length === i + 1)
            return (
              <ProjectCard
                innerRef={ref}
                author={quizz.user}
                key={quizz.id}
                id={quizz.id}
                title={quizz.title}
                numOfQuestions={quizz.questions.length}
                topic={quizz.topic}
                currentUserProjectIds={currentUserProjectIds}
              />
            );
          return (
            <ProjectCard
              author={quizz.user}
              key={quizz.id}
              id={quizz.id}
              title={quizz.title}
              numOfQuestions={quizz.questions.length}
              topic={quizz.topic}
              currentUserProjectIds={currentUserProjectIds}
            />
          );
        })
      )}

      {isFetchingNextPage && hasNextPage ? (
        <ProjectsFeedSkeleton />
      ) : isFetching ? (
        <ProjectsFeedSkeleton />
      ) : null}
    </div>
  );
};
