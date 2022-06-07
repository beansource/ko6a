import getPrismaClient from '@prismaClient'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const prisma = getPrismaClient()
  
  if (req.method === 'POST') {
    try {
      const { name, ghLogin } = req.body
      const user = await prisma.user.create({ data: { name, ghLogin, defaultTeam: ghLogin }})

      if (user) {
        res.json(user)
      } else {
        return res.status(500).json({ error: 'Failed to create user' })
      }
    }
    catch (e) {
      console.log("🚀 ~ file: index.ts ~ line 33 ~ handler ~ e", e)
    }
    
    
  } else {
    return res.status(405).json({ error: 'Method not allowed' })
  }
}
