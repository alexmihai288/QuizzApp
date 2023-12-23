import { db } from "./db";
import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import { SignInAccountValidator } from "./validators/SignInAccountValidator";
import { ZodError } from "zod";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "enter your password",
        },
      },
      async authorize(credentials) {
        try {
          const { email, password } = SignInAccountValidator.parse(credentials);
          const targetUser = await db.user.findUnique({
            where: {
              email,
            },
          });

          if (targetUser) {
            if (!targetUser.password || targetUser.password.trim() === "")
              throw new Error(`Account was created using Google.`);

            const match = await bcrypt.compare(password, targetUser.password);

            if (match) {
              return {
                id: targetUser.id,
                name: targetUser.username,
                email: targetUser.email,
                accessToken: "",
              };
            }

            throw new Error("Password doesn't match.");
          }
          throw new Error("Cannot find your account.");
        } catch (error) {
          if (error instanceof ZodError)
            throw new Error(`${error.issues[0].message}`);

          throw new Error((error as Error).message);
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user && user.name && user.email) {
        const userAlreadyExists = await db.user.findUnique({
          where: {
            username: user.name,
            email: user.email,
          },
        });
        if (!userAlreadyExists) {
          const usernameIsAlreadyTaken = await db.user.findUnique({
            where: {
              username: user.name,
            },
          });
          const emailIsAlreadyTaken = await db.user.findUnique({
            where: {
              email: user.email,
            },
          });
          if (usernameIsAlreadyTaken)
            throw new Error(
              `Username ${user.name} is already taken. Please try another username.`
            );
          if (emailIsAlreadyTaken)
            throw new Error(
              `Email ${user.email} is already taken. Please use another email.`
            );
        }
      }
      return true;
    },
    async jwt({ token }) {
      if (token) {
        const userAlreadyExists = await db.user.findUnique({
          where: {
            username: token.name!,
            email: token.email!,
          },
        });
        if (!userAlreadyExists) {
          const newUser = await db.user.create({
            data: {
              username: token.name!,
              email: token.email!,
              image: token?.picture,
            },
          });
          token.id = newUser.id;
          token.accessToken = jwt.sign(
            { userId: newUser.id, username: newUser.username },
            process.env.NEXTAUTH_SECRET!,
            { expiresIn: "6d" }
          );
        } else {
          token.id = userAlreadyExists.id;
          token.accessToken = jwt.sign(
            {
              userId: userAlreadyExists.id,
              username: userAlreadyExists.username,
            },
            process.env.NEXTAUTH_SECRET!,
            { expiresIn: "6d" }
          );
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session && session.user) {
        session.user.accessToken = token.accessToken as string;
        session.user.id = token.id as string;
      }

      return session;
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
