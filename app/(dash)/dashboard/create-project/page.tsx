import { ArrowLeft } from "lucide-react";
import { FC } from "react";
import { CreateProjectForms } from "./_components/CreateProjectForms";
import Link from "next/link";
import { db } from "@/lib/db";

interface pageProps {
  searchParams: {
    edit: string;
    projectId: string;
  };
}

const page: FC<pageProps> = async ({ searchParams }) => {
  let projectToBeEdited;
  if (searchParams.edit === "true" && searchParams.projectId.trim() !== "")
    projectToBeEdited = await db.project.findFirst({
      where: {
        id: searchParams.projectId,
      },
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
      },
    });

  return (
    <div className="min-h-screen bg-mainOrange pt-5 relative">
      <div className="container">
        <div className="flex items-center mb-20">
          <Link href="/dashboard" className="mr-auto">
            <ArrowLeft className="text-mainLightBlue text-sm" />
          </Link>
          <h1 className="text-white text-4xl font-bold mr-auto">
            Create your project
          </h1>
        </div>

        {/* loading */}
        <CreateProjectForms projectToBeEdited={projectToBeEdited} />
      </div>
    </div>
  );
};

export default page;
