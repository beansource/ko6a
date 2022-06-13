import getPrismaClient from '@prismaClient'
import { NextApiRequest, NextApiResponse } from 'next'

/**
 * !todo: clean up cause it's a mess
 * !todo: add middleware to parse json body cause it's cringe that that is not done for us
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const prisma = getPrismaClient()
  
  if (req.method === 'GET') {
    try {
      const teams = await prisma.team.findMany()
      if (teams) {
        res.json(teams)
      } else {
        return res.status(404).json({ error: 'No teams found' })
      }
    }
    catch (e) {
      console.log("🚀 ~ file: index.ts ~ line 21 ~ handler ~ e", e)
      return res.status(500).json({ error: 'Error retrieving teams' })
    }
    

  } else if (req.method === 'POST') {
    try {
      const { name, ghLogin } = req.body
      const team = await prisma.team.create({ data: { name, members: { create: [{ member: { connect: { ghLogin }}}]} }})
      if (team) {
        res.json(team)
      } else {
        return res.status(500).json({ error: 'Failed to create team' })
      }
    }
    catch (e) {
      console.log("🚀 ~ file: index.ts ~ line 33 ~ handler ~ e", e)
      return res.status(500).json({ error: 'Failed to create team' })
    }
    
  } else {
    return res.status(405).json({ error: 'Method not allowed' })
  }
}
