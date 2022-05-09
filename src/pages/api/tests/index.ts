import { NextApiRequest } from 'next'
import { usePrisma } from '@prismaClient'

export default async function handler(req: NextApiRequest, res) {
  const { method } = req
  const { test, result } = usePrisma()
  
  switch (method) {
    case 'POST':
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
        res.status(200).json({
          message: 'Test exists',
          data: isTest
        })
      }
      
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
      break
    case 'DELETE':
      const { id } = JSON.parse(req.body)
      const removed = await result.delete({
        where: {
          id: id
        }
      })
      res.status(200).json({ message: 'Test result deleted'})
      break
    default:
      res.status(405).json({ error: 'Method not allowed' })
  }
}
