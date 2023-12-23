import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import bcrypt from "bcrypt";
import { SignUpAccountValidator } from "@/lib/validators/SignUpAccountValidator";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { username, email, password, confirmPassword } =
      SignUpAccountValidator.parse(data);

    let hashedPassword;

    if (password) {
      if (password.trim() !== confirmPassword.trim())
        return new NextResponse("Password doesn't match", { status: 400 });

      hashedPassword = await bcrypt.hash(password, 10);
    }

    const newAccount = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { msg: "Your account was successfully created !" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ZodError)
      return new NextResponse(error.issues[0].message, { status: 500 });

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        if (error.meta?.target) {
          return new NextResponse(
            //@ts-ignore
            `This ${error.meta.target[0]} is already taken`,
            { status: 500 }
          );
        }
      }
    }

    return new NextResponse("Something went wrong. Please try again later.", {
      status: 500,
    });
  }
}
