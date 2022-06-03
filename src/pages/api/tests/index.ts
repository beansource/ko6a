import { NextApiRequest } from 'next'
import { usePrisma } from '@prismaClient'

export default async function handler(req: NextApiRequest, res) {
  const { method } = req
  const { test, result } = usePrisma()
  
  switch (method) {
    case 'POST':
      const { repoId, path, repo } = JSON.parse(req.body)
      // is the test exist
      const isTest = await test.findUnique({
        where: {
          test_repo: {
            path: `${repo}/${path.join('/')}`,
            repoId: repoId
          }
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
      } else {
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
      try {
        const removed = await result.delete({
          where: {
            id: id
          }
        })
        if (removed) {
          res.status(200).json({ message: 'Test result deleted'})
        }
      } catch (err) {
        res.status(400).json({ message: 'Issue deleting test'})
      }
      break
    default:
      res.status(405).json({ error: 'Method not allowed' })
  }
}
