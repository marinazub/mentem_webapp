import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod"; // For schema validation
// import { db } from './db'; // Your database connection (e.g., Prisma, Drizzle)
import { prismaDB } from "./lib/connect-db";
import { verifyPassword } from "./utils/verifyPassword";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const authConfig = {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedCredentials = credentialsSchema.safeParse(credentials);

        if (validatedCredentials.success) {
          const { email, password } = validatedCredentials.data;

          const user = await prismaDB.user.findUnique({ where: { email } });

          if (!user) return null;

          const passwordsMatch = await verifyPassword(password, user.password);
          console.log("Password Match:::", passwordsMatch);

          if (passwordsMatch) {
            return {
              id: user.id,
              email: user.email,
            };
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        console.log("user callback::", user);
        // token.role = user.role;
        // token.id = user.id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token && session.user) {
        // session.user.role = token.role as string;
        // session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", // Custom login page
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
