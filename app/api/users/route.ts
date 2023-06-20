import { NextRequest, NextResponse } from "next/server"

export async function GET(
  req: NextRequest,
  { params }: { params: { userUrl: string } }
) {
  const data = { hello: "hello all users" }
  return NextResponse.json(data, { status: 201 })
}
