import { PrismaClient } from '@prisma/client'

let client

export default function getPrismaClient() {
  if (!client) {
    client = new PrismaClient()
  }
  return client
}