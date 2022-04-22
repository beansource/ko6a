import getPrismaClient from '@prismaClient'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { project }: any = req.query
  const prisma = getPrismaClient()

  if (req.method === 'GET') {
    const projects = await prisma.project.findMany({
      where: { name: project },
      include: { repos: true }
    })
    if (projects) {
      res.json(projects[0])
    } else {
      return res.status(404).json({ error: 'Project not found' })
    }
  } else if (req.method === 'DELETE') {
    const deletedProject = await prisma.project.delete({ where: { name: project } })
    if (deletedProject) {
      res.json(deletedProject)
    } else {
      return res.status(500).json({ error: 'Failed to delete project' })
    }
  }
}
