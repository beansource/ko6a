import getPrismaClient from '@prismaClient'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { login }: any = req.query
  const prisma = getPrismaClient()

  if (req.method === 'GET') {
    try {
      const teams = await prisma.team.findMany({ where: { members: { some: { member: { ghLogin: login }}}}})
      if (teams) {
        res.json(teams)
      } else {
        return res.status(404).json({ error: 'Teams not found :(' })
      }
    }
    catch (e) {
      console.log("🚀 ~ file: teams.ts ~ line 20 ~ handler ~ e", e)
      return res.status(500).json({ error: 'Error retrieving teams' })
    }
  } 
}
