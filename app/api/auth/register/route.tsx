import { NextRequest, NextResponse } from "next/server"
import prisma from "@/prisma/prisma.client"
import bcrypt from "bcryptjs"
import z from "zod"

const registerUserSchema = z.object({
  email: z
    .string()
    .regex(
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
      "Invalid email"
    ),
  password: z.string().min(5, "Password should be minimum 5 charachters"),
  name: z.string(),
})

export async function POST(req: NextRequest) {
  console.log("Registering user......")
  const credentials = await req.json()
  console.log("credentials:", credentials)
  try {
    const credValidation = registerUserSchema.safeParse(credentials)
    if (!credValidation.success) {
      const errors = credValidation.error
      return NextResponse.json(errors)
    }
    const { data } = credValidation
    const { email, password, name } = data
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (user !== null) {
      return NextResponse.json({ user: null, error: "Email already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    return NextResponse.json({
      user: newUser,
      message: "User created successfully",
    })
  } catch (err) {
    console.log("err:", err)
  }
}
