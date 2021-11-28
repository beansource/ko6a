import { PrismaClient } from '@prisma/client'

export default async function handler(_req, res) {
  const prisma: PrismaClient = new PrismaClient()
  const projects = await prisma.project.findMany({ include: { repos: true } })
  res.json(projects)
}
