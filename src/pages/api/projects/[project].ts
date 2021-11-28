import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { project }: any = req.query
  
  const prisma: PrismaClient = new PrismaClient()
  const projectData = await prisma.project.findUnique({
    where: {
      name: project
    },
    include: {
      repos: true
    }
  })

  if (projectData) {
    res.json(projectData)
  } else {
    res.status(404).json({ message: 'Project not found :(' })
  }
}
