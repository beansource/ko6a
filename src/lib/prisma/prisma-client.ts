import { PrismaClient } from '@prisma/client'

export default function getPrismaClient(): PrismaClient {
  if (!global.prismaClient) {
    global.prismaClient = new PrismaClient()
  }
  return global.prismaClient
}

export { getPrismaClient as usePrisma }
export { getPrismaClient as useDB }