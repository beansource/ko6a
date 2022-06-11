import getPrismaClient from '@prismaClient'
import { NextApiRequest, NextApiResponse } from 'next'
import { getUser } from '@util/github-api'
import { getSession } from 'next-auth/react'
import { setupNewUser } from '@lib/prisma/api'

export default async function users(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  let { login }: any = req.query
  const prisma = getPrismaClient()

  if (req.method === 'GET') {
    try {
      const { user: ghUser } = await getUser(session.accessToken, login)
      const user = await prisma.user.findUnique({
        where: {
          ghLogin: login
        },
        include: {
          teams: {
            select: {
              team: true
            }
          }
        }
      })
      
      // todo: is this returning an actual object after creation?
      if (!user) {
        await setupNewUser(login, ghUser.name)
      }

      const parsedUser = {
        ...user,
        teams: user.teams.map(team => team.team)
      }
      res.json({ ...parsedUser, ...ghUser })
    }
    catch (e) {
      console.log("🚀 ~ file: index.ts ~ line 20 ~ handler ~ e", e)
      return res.status(500).json({ error: 'Error retrieving user' })
    }
  }

  if (req.method === 'PUT') {
    try {
      const user = await prisma.user.update({ where: { ghLogin: login }, data: req.body })
      if (user) {
        res.json({ message: 'Successfully updated default team' })
      } else {
        return res.status(404).json({ error: 'User not found :(' })
      }
    }
    catch (e) {
      console.log("🚀 ~ file: index.ts ~ line 38 ~ handler ~ e", e)
      return res.status(500).json({ error: 'Error updating user' })
    }
  } 
}