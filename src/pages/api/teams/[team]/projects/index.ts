import getPrismaClient from '@prismaClient'
import { NextApiRequest } from 'next'

/**
 * !todo: clean up cause it's a mess
 * !todo: add middleware to parse json body cause it's cringe that that is not done for us
 */
export default async function handler(req: NextApiRequest, res) {
  const prisma = getPrismaClient()
  const { team }: any = req.query
  
  if (req.method === 'GET') {
    const projects = await prisma.project.findMany({
      where: { projectOwner: { name: team }}, 
      include: { repos: true }
    })
    if (projects) {
      res.json(projects)
    } else {
      return res.status(404).json({ error: 'No projects found' })
    }
  } else if (req.method === 'POST') {
    const { name, description } = req.body
    const project = await prisma.project.create({ data: { name, description, projectOwner: { 
      connect: {
        name: team
      }
    }}})

    if (project) {
      res.json(project)
    } else {
      return res.status(500).json({ error: 'Failed to create project' })
    }
    
  } else {
    return res.status(405).json({ error: 'Method not allowed' })
  }
}
