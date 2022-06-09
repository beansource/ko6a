import getPrismaClient from '@prismaClient'
import { NextApiRequest, NextApiResponse } from 'next'

export interface Repo {
  owner: string
  repo: string
  description: string | null
  parentProject: string
}

// endpoint handler that returns a list of repos for a project
export default async function repos(req: NextApiRequest, res: NextApiResponse) {
  const { project, team }: any = req.query
  const prisma = getPrismaClient()

  const projectData = await prisma.project.findUnique({ where: { name_projectOwnerName: { name: project, projectOwnerName: team } } })
  if (!projectData) {
    res.status(404).json({ error: 'Project not found' })
  }

  if (req.method === 'GET') {
    const repos = await prisma.repo.findMany({ where: { project: { id: projectData.id } } })
    console.log(repos)
    res.status(200).json(repos)
  } else if (req.method === 'POST') {
    const { owner, repo, description }: Repo = req.body
    const newRepo = await prisma.repo.create({ data: {
      owner, 
      repo,
      description,
      parentProject: projectData.id
    }})
    res.status(201).json({ message: 'Repo created!', repo: newRepo })
  }
}
