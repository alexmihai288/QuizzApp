import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id) throw new Error("You must be logged");

    const data = await req.json();

    const checkIfProjectExists = await db.project.findFirst({
      where: {
        id: data.projectId,
      },
    });

    if (!checkIfProjectExists?.id) throw new Error("Project doesn't exist");

    const checkIfFinishedProjectExists = await db.finishedProjects.findFirst({
      where: {
        projectId: data.projectId,
      },
    });

   if (checkIfFinishedProjectExists)
      return NextResponse.json({ ok: true }, { status: 200 });
    await db.finishedProjects.create({
      data: {
        userId: session.user.id,
        projectId: data.projectId,
        status: "Taken",
      },
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { msg: (error as Error).message },
      { status: 500 }
    );
  }
}
