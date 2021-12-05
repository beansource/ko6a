import getPrismaClient from '@prismaClient'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name }: any = req.query
  const prisma = getPrismaClient()

  if (req.method === 'GET') {
    try {
      const team = await prisma.team.findUnique({ where: { name } })
      if (team) {
        res.json(team)
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
      const team = await prisma.team.update({ where: { name },
        data: {
          name: newName
        }
      })
      const teammates = await prisma.user.updateMany({ where: { teamName: name },
        data: {
          teamName: newName
        }
      })
      if (team && teammates) {
        res.json(team)
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
