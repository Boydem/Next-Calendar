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
        const { password, email } = loginUserSchema.parse(credentials)
        const user = await prisma.user.findUnique({
          where: { email },
        })
        if (!user) return null

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) return null

        return user
      },
    }),
  ],
  pages: { signIn: "/auth/login", newUser: "/auth/register" },
  secret: process.env.JWT_SECRET,
  session: { strategy: "jwt" },
  debug: process.env.NODE_ENV === "development",
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
