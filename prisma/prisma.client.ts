import { PrismaClient } from "@prisma/client"

interface CustomGlobal extends Global {
  prisma: PrismaClient
}

declare const global: CustomGlobal

let prisma: PrismaClient

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export default prisma
