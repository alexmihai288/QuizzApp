import { FC } from "react";
import { ProjectsFeed } from "../_components/ProjectsFeed";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

interface pageProps {}

const page: FC<pageProps> = async () => {
  const session = await getAuthSession();
  const currentUserFinishedProjectIds = await db.finishedProjects.findMany({
    where: {
      userId: session?.user?.id,
    },
    select: {
      projectId: true,
    },
  });

  return (
    <div className="min-h-screen bg-mainOrange">
      <div className="container">
          <ProjectsFeed currentUserProjectIds={currentUserFinishedProjectIds} />
      </div>
    </div>
  );
};

export default page;
