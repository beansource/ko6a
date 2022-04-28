import { NextApiRequest } from 'next'
import { usePrisma } from '@prismaClient'

export default async function handler(req: NextApiRequest, res) {
  const { test } = usePrisma()
  
  if (req.method === 'POST') {
    const { repoId, path, repo } = JSON.parse(req.body)

    // is the test exist
    const isTest = await test.findFirst({
      where: {
        path: `${repo}/${path.join('/')}`
      },
      include: {
        results: {
          include: {
            user: true
          }
        }
      }
    })
    if (isTest) {
      console.log(`👹 ~ file: index.ts ~ line 34 ~ handler ~ isTest`, isTest)
      res.status(200).json({
        message: 'Test exists',
        data: isTest
      })
    }
    
    console.log(req.body)
    if (!isTest) {
      const newTest = await test.create({
        data: {
          repoId: repoId,
          path: `${repo}/${path.join('/')}`,
          name: path[path.length - 1]
        }
      })
      res.status(201).json({
        message: 'Test created',
        data: newTest
      })
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' })
  }
}
