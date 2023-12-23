import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { CreateQuestion, UpdateQuestion } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id) throw new Error("You must be logged");

    const data = await req.json();

    const questions = data.questions.map((questionData: UpdateQuestion) => ({
      questionText: questionData.questionText,
      answers: {
        create: questionData.answers.map((answerData) => ({
          answerText: answerData.answerText,
          isCorrect: answerData.isCorrect,
        })),
      },
    }));

    await db.project.update({
        where: {
          id: data.projectId,
        },
        data: {
          title: data.title,
          topic: data.topic,
          questions: {
            update: data.questions.map((questionData: UpdateQuestion) => ({
              where: {
                id: questionData.id, // Provide the ID of the question you want to update
              },
              data: {
                questionText: questionData.questionText,
                answers: {
                  update: questionData.answers.map((answerData) => ({
                    where: {
                      id: answerData.id, // Provide the ID of the answer you want to update
                    },
                    data: {
                      answerText: answerData.answerText,
                      isCorrect: answerData.isCorrect,
                    },
                  })),
                },
              },
            })),
          },
        },
      });

    return NextResponse.json({ msg: "Project successfully updated" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { msg: (error as Error).message },
      { status: 500 }
    );
  }
}
