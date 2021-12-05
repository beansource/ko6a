import getPrismaClient from '@prismaClient'
import { NextApiRequest } from 'next'

/**
 * !todo: clean up cause it's a mess
 * !todo: add middleware to parse json body cause it's cringe that that is not done for us
 */
export default async function handler(req: NextApiRequest, res) {
  const prisma = getPrismaClient()
  
  if (req.method === 'GET') {
    try {
      const teams = await prisma.team.findMany({ include: { members: true } })
      if (teams) {
        res.json(teams)
      } else {
        return res.status(404).json({ error: 'No teams found :(' })
      }
    }
    catch (e) {
      console.log("🚀 ~ file: index.ts ~ line 21 ~ handler ~ e", e)
      return res.status(500).json({ error: 'Error retrieving teams' })
    }
    

  } else if (req.method === 'POST') {
    try {
      const { name, memberId } = JSON.parse(req.body)
      const user = await prisma.user.findUnique({ where: { ghLogin: memberId }})
      const team = await prisma.team.findUnique({ where: { name }})
      const wee = await prisma.team.update({
        where: { id: team.id },
        data: {
          members: {
            connect: {
              id: user.id
            }
          }
        }
      })
      if (team) {
        res.json(team)
      } else {
        return res.status(500).json({ error: 'Failed to create team :(' })
      }
    }
    catch (e) {
      console.log("🚀 ~ file: index.ts ~ line 33 ~ handler ~ e", e)
      return res.status(500).json({ error: 'Failed to create team :(' })
    }
    
    
  } else {
    return res.status(405).json({ error: 'Method not allowed' })
  }
}
