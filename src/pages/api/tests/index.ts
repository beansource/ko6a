import { NextApiRequest } from 'next'
import { usePrisma } from '@prismaClient'

export default async function handler(req: NextApiRequest, res) {
  const { test } = usePrisma()

  const { path }: any = req.query
  
  if (req.method === 'GET') {
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
    }
  } else if (req.method === 'POST') {
    const { repoId, path, repo } = JSON.parse(req.body)
    console.log(req.body)
    const newTest = await test.create({
      data: {
        repoId: repoId,
        path: `${repo}/${path.join('/')}`,
        name: path[path.length - 1]
      }
    })
    console.log(newTest)
  } else {
    return res.status(405).json({ error: 'Method not allowed' })
  }
}
