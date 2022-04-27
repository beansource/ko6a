import getPrismaClient from '@prismaClient'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { team, project }: any = req.query
  const prisma = getPrismaClient()

  if (req.method === 'GET') {
    try {
      const projectData = await prisma.project.findUnique({
        where: { name_projectOwnerName: { name: project, projectOwnerName: team } },
        include: { repos: true }
      })
      if (projectData) {
        res.json(projectData)
      } else {
        return res.status(404).json({ error: 'Project not found' })
      }
    }
    catch (e) {
      console.error("🤠 ~ file: index.ts ~ line 21 ~ handler ~ e", e);
      return res.status(500).json({ error: 'Failed to retrieve projects' })
    }
    
  } else if (req.method === 'DELETE') {
    try {
      const projectToDelete = await prisma.project.findUnique({ where: { name_projectOwnerName: { name: project, projectOwnerName: team } } })

      // if project is found, delete all child repos
      if (projectToDelete) {
        await prisma.repo.deleteMany({ where: { parentProject: projectToDelete.id } })
      }
      const deletedProject = await prisma.project.delete({ where: { id: projectToDelete.id } })
      if (deletedProject) {
        res.json(deletedProject)
      } else {
        return res.status(500).json({ error: 'Failed to delete project' })
      }
    }
    catch (e) {
      console.error("🤠 ~ file: index.ts ~ line 34 ~ handler ~ e", e);
      return res.status(500).json({ error: 'Failed to delete project' })
    }
    
  }
}
