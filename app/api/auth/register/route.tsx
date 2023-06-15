import { NextRequest, NextResponse } from "next/server"
import prisma from "@/prisma/prisma.client"
import bcrypt from "bcryptjs"

import { registerUserSchema } from "@/lib/schemas"

export async function POST(req: NextRequest) {
  try {
    const credentials = await req.json()
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
