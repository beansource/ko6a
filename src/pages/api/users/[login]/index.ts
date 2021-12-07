import getPrismaClient from '@prismaClient'
import { NextApiRequest, NextApiResponse } from 'next'
import { getUser } from '@util/githubApi'
import { getSession } from 'next-auth/react'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  const { login }: any = req.query
  const prisma = getPrismaClient()

  if (req.method === 'GET') {
    try {
      const user = await prisma.user.findUnique({where: { ghLogin: login }})
      if (user) {
        const { user: ghUser } = await getUser(session.accessToken, user.ghLogin)
        res.json({ ...user, ...ghUser })
      } else {
        return res.status(404).json({ error: 'User not found :(' })
      }
    }
    catch (e) {
      console.log("🚀 ~ file: index.ts ~ line 20 ~ handler ~ e", e)
      return res.status(500).json({ error: 'Error retrieving user' })
    }
  } 
  if (req.method === 'PUT') {
    try {
      const user = await prisma.user.update({ where: { ghLogin: login }, data: JSON.parse(req.body) })
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
