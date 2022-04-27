import getPrismaClient from '@prismaClient'
import { NextApiRequest, NextApiResponse } from 'next'
import { getUser } from '@util/githubApi'
import { getSession } from 'next-auth/react'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  const { team }: any = req.query
  
  const prisma = getPrismaClient()

  if (req.method === 'GET') {
    try {
      const teammates = await prisma.user.findMany({ where: { teams: { some: { team: { name: team }}}}})
      if (teammates) {
        const members = []
        for await (const member of teammates) {
          const { user: ghUser } = await getUser(session.accessToken, member.ghLogin)
          members.push({ ...member, ...ghUser })
        }
        res.json(members)
      } else {
        return res.status(404).json({ error: 'Members not found :(' })
      }
    }
    catch (e) {
      console.log("🚀 ~ file: members.ts ~ line 27 ~ handler ~ e", e)
      return res.status(500).json({ error: 'Error retrieving team members' })
    }
  }
  else if (req.method === 'PUT') {
    try {
      const { ghLogin } = JSON.parse(req.body)
      const membership = await prisma.team.update({ where: { name: team }, data: { members: { create: [{ member: { connect: { ghLogin }}}] } }})
      const members = await prisma.user.findMany({ where: { teams: { some: { team: { name: team }}}}})
      if (membership && members) {
        res.json(members)
      } else {
        return res.status(500).json({ error: 'Error updating team members' })
      }
    }
    catch (e) {
      console.log("🚀 ~ file: members.ts ~ line 37 ~ handler ~ e", e)
      return res.status(500).json({ error: 'Error updating team members' })
    }
  }
  else if (req.method === 'DELETE') {
    try {
      const { ghLogin } = JSON.parse(req.body)
      const user = await prisma.user.findUnique({ where: { ghLogin }})
      const teamData = await prisma.team.findUnique({ where: { name: team }})
      const membership = await prisma.teamMember.delete({ where: { userId_teamId: { userId: user.id, teamId: teamData.id }}})
      if (membership) {
        res.json(teamData)
      } else {
        return res.status(404).json({ error: 'User does not belong to this team' })
      }
    }
    catch (e) {
      console.log("🚀 ~ file: members.ts ~ line 37 ~ handler ~ e", e)
      return res.status(500).json({ error: 'Error removing team members' })
    }
  }
}
