import getPrismaClient from '@prismaClient'
import { NextApiRequest } from 'next'

/**
 * !todo: clean up cause it's a mess
 * !todo: add middleware to parse json body cause it's cringe that that is not done for us
 */
export default async function handler(req: NextApiRequest, res) {
  const prisma = getPrismaClient()
  const { name }: any = req.query
  
  if (req.method === 'GET') {
    const projects = await prisma.project.findMany({ where: { projectOwner: { name }}, include: { repos: true }})
    if (projects) {
      res.json(projects)
    } else {
      return res.status(404).json({ error: 'No projects found :(' })
    }
  }
}
