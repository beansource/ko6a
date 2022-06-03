import { NextApiRequest } from 'next'
import { usePrisma } from '@prismaClient'

export default async function handler(req: NextApiRequest, res) {
  const { method } = req
  const { result } = usePrisma()
  const { id } = req?.query
  
  switch (method) {
    case 'GET':
      const data = await result.findUnique({
        where: {
          id: Number(id)
        },
        include: {
          user: true,
          test: {
            include: {
              repo: {
                include: {
                  project: true
                }
              }
            }
          }
        }
      })
      res.status(200).json({
        message: 'Result data found',
        data
      })
      break
    default:
      res.status(405).json({ error: 'Method not allowed' })
  }
}
