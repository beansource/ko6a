import getPrismaClient from '@prismaClient'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { project, repo }: any = req.query
  const prisma = getPrismaClient()

  if (req.method === 'GET') {
    const _repo = await prisma.repo.findUnique({
      where: { repo_parentProject: { repo, parentProject: project } }
    })
    if (_repo) {
      res.json(_repo)
    } else {
      return res.status(404).json({ error: 'Repo not found :(' })
    }
  }
}
