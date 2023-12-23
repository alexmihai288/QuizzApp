import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { CreateQuestion } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id) throw new Error("You must be logged");

    const data = await req.json();

    const questions = data.questions.map((questionData: CreateQuestion) => ({
      questionText: questionData.questionText,
      answers: {
        create: questionData.answers.map((answerData) => ({
          answerText: answerData.answerText,
          isCorrect: answerData.isCorrect,
        })),
      },
    }));

    const chat = await db.chat.create({
      data: {},
    });

    await db.project.create({
      data: {
        userId: session.user.id,
        title: data.title,
        topic: data.topic,
        questions: {
          create: questions,
        },
        chatId: chat.id,
      },
    });

    return NextResponse.json({ msg: "Project successfully created" });
  } catch (error) {
    return NextResponse.json(
      { msg: (error as Error).message },
      { status: 500 }
    );
  }
}
