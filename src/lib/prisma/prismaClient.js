import { PrismaClient } from '@prisma/client'

export default function getPrismaClient() {
  if (!global.prismaClient) {
    global.prismaClient = new PrismaClient()
  }
  return global.prismaClient
}