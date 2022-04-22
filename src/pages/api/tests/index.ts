import { NextApiRequest } from 'next'
import { usePrisma } from '@prismaClient'

export default async function handler(req: NextApiRequest, res) {
  const { test } = usePrisma()

  const { path }: any = req.query
  
  if (req.method === 'GET') {

    const testResponse = await test.create({
      data: {
        path: path,
        name: path,
        repoId: 0
      }
    })
    console.log(testResponse)

    const testObject = await test.findFirst({
      where: {
        path: path
      },
      include: {
        results: true
      }
    })
    console.log(`🤓 ~ file: index.ts ~ line 15 ~ handler ~ id`, testObject);

    const results = await test.findMany({ include: { results: true }})
    if (results) {
      res.json(results)
    } else {
      return res.status(404).json({ error: 'No test found' })
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' })
  }
}
