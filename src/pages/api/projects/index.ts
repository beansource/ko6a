import { PrismaClient } from '@prisma/client'

export default async function handler(_req, res) {
  const prisma: PrismaClient = new PrismaClient()
  const projects = await prisma.project.findMany({ include: { repos: true } })

  if (projects) {
    res.json(projects)
  } else {
    return res.status(404).json({ error: 'No projects found :(' })
  }
}
