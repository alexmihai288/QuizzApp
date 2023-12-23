import { db } from "@/lib/db";
import { FC, Suspense } from "react";
import { Project } from "@/app/(quizz)/_components/Project";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllQuizzesId } from "@/lib/staticGenerate/getProjectsIds";
interface pageProps {
  params: {
    id: string;
  };
}

const page: FC<pageProps> = async ({ params: { id } }) => {
  const project = await db.project.findFirst({
    where: {
      id: id,
    },
    include: {
      questions: {
        include: {
          answers: true,
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
    <div className="min-h-screen bg-mainOrange flex items-center justify-center">
      <Suspense fallback={<ProjectSkel />}>
        {project && <Project project={project} />}
      </Suspense>
    </div>
  );
};

export default page;

const ProjectSkel = function ProjectSkeleton() {
  return (
    <div className="border-2 border-mainLightBlue p-2 rounded-sm flex-1">
      <div className="bg-white p-2 rounded-sm">
        <Skeleton className="w-[30%] h-8 mx-auto" />
        <Skeleton className="w-[15%] h-4 mx-auto mt-2.5" />

        <div className="mt-10 flex items-center gap-2.5">
          <Skeleton className="w-[10%] h-8" />
          <Skeleton className="w-[50%] h-8" />
        </div>
        <div className="mt-10 flex items-center justify-evenly">
          <Skeleton className="w-[10%] h-10" />
          <Skeleton className="w-[10%] h-10" />
          <Skeleton className="w-[10%] h-10" />
          <Skeleton className="w-[10%] h-10" />
        </div>
      </div>
    </div>
  );
};

export async function generateStaticParams() {
  const quizzes = await getAllQuizzesId();

  return quizzes?.map((quizz: { id: string }) => ({
    id: quizz.id,
  }));
}
