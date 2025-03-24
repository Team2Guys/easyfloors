import  { SessionStrategy, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import client from "config/apolloClient";
import { LOGIN_USER } from "graphql/user_mutation";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

interface CustomUser extends User {
  id: string;
  name: string;
  email: string;
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { data } = await client.mutate({
            mutation: LOGIN_USER,
            variables: {
              userLogin: { email: credentials?.email, password: credentials?.password },
            },
          });
          if (data?.userLogin) {
            return {
              id: data.userLogin.id,
              name: data.userLogin.name,
              email: data.userLogin.email,
              image: data.userLogin.userImageUrl || null,
            } as CustomUser;
          }

          return null;
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.image = token.picture || "/default-avatar.png";

        token.exp = Math.floor(Date.now() / 1000) + 5 * 60;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 5 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};
