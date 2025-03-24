import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { saltAndHashPassword } from "./utils/saltAndHashPassword";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      authorize: async (credentials) => {
        let user: User | null = null;
        console.log("credentials", credentials);
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        return {
          id: "",
          name: "Admin",
          email: "test@email.com",
        };
      },
    }),
  ],
});
