import getPrismaClient from '@prismaClient'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { team, project, repo }: any = req.query
  const prisma = getPrismaClient()

  const projectData = await prisma.project.findUnique({ where: { name_projectOwnerName: { name: project, projectOwnerName: team } } })
  if (!projectData) {
    res.status(404).json({ error: 'Project not found' })
  }

  if (req.method === 'GET') {
    const _repo = await prisma.repo.findUnique({
      where: { repo_project: { repo, parentProject: projectData.id } }
    })
    if (_repo) {
      res.json(_repo)
    } else {
      return res.status(404).json({ error: 'Repo not found' })
    }
  }
}
