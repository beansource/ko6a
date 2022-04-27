import getPrismaClient from '@prismaClient'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { team }: any = req.query
  const prisma = getPrismaClient()

  if (req.method === 'GET') {
    try {
      const teamData = await prisma.team.findUnique({ where: { name: team } })
      if (teamData) {
        res.json(teamData)
      } else {
        return res.status(404).json({ error: 'Team not found :(' })
      }
    }
    catch (e) {
      console.log("🚀 ~ file: index.ts ~ line 18 ~ handler ~ e", e)
      return res.status(500).json({ error: 'Error retrieving team' })
    }
  }
  else if (req.method === 'PUT') {
    try {
      const { name: newName } = JSON.parse(req.body)
      const teamData = await prisma.team.update({ where: { name: team },
        data: {
          name: newName
        }
      })
      const members = await prisma.user.updateMany({ where: { defaultTeam: team }, data: { defaultTeam: newName }})
      if (teamData && members) {
        res.json(teamData)
      } else {
        return res.status(500).json({ error: 'Error updating team' })
      }
    }
    catch (e) {
      console.log("🚀 ~ file: index.ts ~ line 37 ~ handler ~ e", e)
      return res.status(500).json({ error: 'Error updating team' })
    }
  }
}
