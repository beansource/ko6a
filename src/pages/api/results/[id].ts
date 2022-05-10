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
        }
      })
      console.log(`👹 ~ file: [id].ts ~ line 17 ~ handler ~ data`, data)
      res.status(200).json({
        message: 'Result data found',
        data
      })
      break
    default:
      res.status(405).json({ error: 'Method not allowed' })
  }
}
