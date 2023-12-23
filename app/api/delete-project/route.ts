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
        id: data.id,
      },
    });

    if (!checkIfProjectExists?.id) throw new Error("Project doesn't exist");

    const deletedProject = await db.project.delete({
      where: {
        id: data.id,
      },
    });

    return NextResponse.json(deletedProject.title);
  } catch (error) {
    return NextResponse.json(
      { msg: (error as Error).message },
      { status: 500 }
    );
  }
}
