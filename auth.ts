import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { getUserWithPassword } from "@/app/lib/prisma" 
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && typeof token.id === 'string') {
        session.user.id = token.id;
      }
      return session;
    },
  },


  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {},
        password: {},
      },

      authorize: async (credentials) => {
        try {
          const email = credentials?.email;
          const password = credentials?.password;
  
          if (typeof email === "string" && typeof password === "string") {
            const user = await getUserWithPassword(email, password);
            if (user?.id) {
              return {
                id: user.id,
                email: user.email,
              }
            } else {
              throw new Error("User does not exist");
            }
          } else {

            return null;
          }
        } catch (e) {
          throw new Error(e instanceof Error ? e.message : String(e));
        }
      },
    }),
  ],
})