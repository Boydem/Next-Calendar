import { NextRequest, NextResponse } from "next/server"
import prisma from "@/prisma/prisma.client"

export async function GET(
  req: NextRequest,
  { params }: { params: { userUrl: string } }
) {
  const { userUrl } = params
  const user = await prisma.user.findUnique({
    where: { userUrl: "/" + userUrl },
  })
  // if (!user) throw new Error(JSON.stringify(user))
  return NextResponse.json(user, { status: 200 })
}
