import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
  type User,
} from "next-auth";
import { prisma } from "@/server/db";
import Credentials from "next-auth/providers/credentials";
import argon2 from "argon2";

export async function isPasswordValid(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  const isValid = await argon2.verify(hashedPassword, password);
  return isValid;
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string | null | undefined;
      email: string | null | undefined;
      name: string | null | undefined;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    // ...other properties
    // role: UserRole;
    id: string;
    email: string;
    name: string;
    
  }
}

export const authOptions: NextAuthOptions = {
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
        session.user.email = token.email;
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

        const user = await prisma.user.findFirst({
          where: {
            email: credentials?.email,
          },
        });

        if (
          user &&
          (await isPasswordValid(
            credentials?.password,
            user?.password as string
          ))
          ) {
          return {
            id: user.id,
            name: user.name as string,
            email: user.email,
          };
        } else {
          return null;
        }
      },
    }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);
