import getPrismaClient from '@prismaClient'
import { NextApiRequest } from 'next'

/**
 * !todo: clean up cause it's a mess
 * !todo: add middleware to parse json body cause it's cringe that that is not done for us
 */
export default async function handler(req: NextApiRequest, res) {
  const prisma = getPrismaClient()
  
  if (req.method === 'GET') {
    const projects = await prisma.project.findMany({ include: { repos: true } })
    if (projects) {
      res.json(projects)
    } else {
      return res.status(404).json({ error: 'No projects found' })
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' })
  }
}
