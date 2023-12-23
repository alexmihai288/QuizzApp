import { db } from "@/lib/db";
import { NextRequest } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);

  try {
    const { limit, page } = z
      .object({
        limit: z.string(),
        page: z.string(),
      })
      .parse({
        limit: url.searchParams.get("limit"),
        page: url.searchParams.get("page"),
      });

    const quizzes = await db.project.findMany({
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit), // skip should start from 0 for page 1
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
    return new Response(JSON.stringify(quizzes));
  } catch (error) {
    return new Response("Could not fetch quizzes", { status: 500 });
  }
}
