import { useDB } from '@prismaClient'
import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * Ko6a projects API
 */
export default async function projectsApi(req: NextApiRequest, res: NextApiResponse) {
  const { project } = useDB()

  switch (req.method) {
    case 'GET': {
      const projects = await project.findMany({ include: { repos: true } })
      if (projects) {
        return res.json(projects)
      } else {
        return res.status(404).json({ error: 'Project not found' })
      }
    }
    default: 
      return res.status(405).end()
  }
}
