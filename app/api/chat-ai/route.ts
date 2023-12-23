import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id) throw new Error("You must be logged");

    const data = await req.json();

    await db.message.create({
      data: {
        isAi: data.isAi,
        text: data.inputValue,
        chatId: data.chatId,
      },
    });

    return NextResponse.json({ msg: "OK" });
  } catch (error) {
    NextResponse.json({ msg: (error as Error).message }, { status: 500 });
  }
}
