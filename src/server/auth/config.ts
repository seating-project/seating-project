import { PrismaAdapter } from "@auth/prisma-adapter";
import argon2 from "argon2";
import { type DefaultSession, type NextAuthConfig, type User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { db as prisma } from "@/server/db";

export async function isPasswordValid(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  const isValid = await argon2.verify(hashedPassword, password);
  return isValid;
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

export const authConfig = {
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },

    session({ session, token }) {
      if (token) {
        session.user.name = token.name;
        session.user.email = token.email!;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const { email, password } = credentials as Record<string, string>;

        if (!email || !password) {
          return null;
        }

        const user = await prisma.user.findFirst({
          where: {
            email,
          },
        });

        if (user && (await isPasswordValid(password, user?.password ?? ""))) {
          return {
            id: user.id,
            name: user.name ?? "",
            email: user.email,
          };
        } else {
          return null;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
