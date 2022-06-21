import { useDB } from '@prismaClient'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function repoAPI(req: NextApiRequest, res: NextApiResponse) {
  const { repoName, team, project }: any = req.query
  const { repo } = useDB()

  switch (req.method) {
    case 'GET': {
      const repoData = await repo.findFirst({
        where: {
          repo: repoName,
          project: {
            name: project,
            projectOwner: {
              name: team
            }
          }
        }
      })
      
      repoData
        ? res.status(200).json(repoData)
        : res.status(404).json({ message: 'Repo not found' })
    }
    default: 
      return res.status(405)
  }
}