import db from "./db";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

interface Credentials {
  phone: string;
  password: string;
}

export const authOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            phone: { label: "Phone number", type: "text", placeholder: "1231231231", required: true },
            password: { label: "Password", type: "password", required: true }
          },
          
          async authorize(credentials: Credentials | undefined) {
            // Check if credentials are provided
            if (!credentials || !credentials.phone || !credentials.password) {
                return null;
            }
            const existingUser = await db.user.findUnique({
                where: {
                    number: credentials.phone
                }
            });

            if (existingUser) {
                const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                if (passwordValidation) {
                    return {
                        id: existingUser.id.toString(),
                        name: existingUser.name,
                        email: existingUser.number
                    }
                }
                return null;
            }

            return null
          },
        })
    ],
    pages: {
        signIn: "/login",
        error: "/login"
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
       
        async session({ token, session }: { token: JWT; session: Session }) {
            if (session.user && token.sub) {
                // Extend the user object to include id
                (session.user as typeof session.user & { id?: string }).id = token.sub;
            }
            return session;
        }
    }
  }
  