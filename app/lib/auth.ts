import db from "./db";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";

export const authOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            phone: { label: "Phone number", type: "text", placeholder: "1231231231", required: true },
            password: { label: "Password", type: "password", required: true }
          },
          
          async authorize(credentials: any) {
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
       
        async session({ token, session }: any) {
            if(session.user)
            session.user.id = token.sub

            return session
        }
    }
  }
  