import prisma from "@/prisma/prisma.client"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import bcrypt from "bcryptjs"
import { AuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

import { loginUserSchema } from "@/lib/schemas"

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          scope:
            "openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar",
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      profile: (profile) => {
        const { email, email_verified, picture, name, sub } = profile
        return {
          id: sub,
          email,
          image: picture,
          name,
          emailVerified: email_verified,
        }
      },
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text", placeholder: "John Smith" },
      },
      async authorize(credentials) {
        try {
          const { password, email } = loginUserSchema.parse(credentials)
          // check to see if user exists
          const user = await prisma.user.findUnique({
            where: { email },
          })
          // if no user was found
          if (!user || !user?.hashedPassword) {
            throw new Error("No user found")
          }
          // check to see if password matches
          const isPasswordValid = await bcrypt.compare(
            password,
            user.hashedPassword
          )
          // if password does not match
          if (!isPasswordValid) throw new Error("Incorrect password")
          return user
        } catch (err) {
          throw new Error(err as string)
        }
      },
    }),
  ],
  pages: { signIn: "/login", newUser: "/register", error: "/login" },
  secret: process.env.JWT_SECRET,
  session: { strategy: "jwt" },
  debug: process.env.NODE_ENV === "development",
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
