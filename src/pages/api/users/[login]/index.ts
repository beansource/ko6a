import getPrismaClient from '@prismaClient'
import { NextApiRequest, NextApiResponse } from 'next'
import { getUser } from '@util/github-api'
import { getSession } from 'next-auth/react'
import { setupNewUser } from '@lib/prisma/api'

export default async function users(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  let { login }: any = req.query
  const prisma = getPrismaClient()

  switch (req.method) {
    case 'GET': {
      try {
        const { user: ghUser } = await getUser(session.accessToken, login)
        
        let user: any
        user = await prisma.user.findUnique({
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
        
        if (!user) {
          const { name, bio } = ghUser
          user = await setupNewUser(login, name, bio)
        }
  
        const parsedUser = {
          ...user,
          teams: user.teams.map(team => team.team)
        }
        
        // order matters here since github has some overlapping prop keys
        return res.status(200).json({ ...ghUser, ...parsedUser })
      } catch (e) {
        return res.status(500).json({ error: 'Error retrieving user' })
      }
    }
    
    case 'PUT': {
      try {
        const payload = await JSON.parse(req.body)
        const user = await prisma.user.update({ where: { ghLogin: login }, data: payload })
        if (user) {
          res.json({ message: 'Successfully updated default team' })
        } else {
          return res.status(404).json({ error: 'User not found :(' })
        }
      } catch (e) {
        return res.status(500).json({
          message: 'Error updating user',
          error: e
        })
      }
    }
    
    default:
      return res.status(405)
  }
}