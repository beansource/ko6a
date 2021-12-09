import { Octokit } from '@octokit/rest'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })

  const octokit = new Octokit({
    auth: session?.accessToken
  })

  const { owner, repo, path }: any = JSON.parse(req.body)
  if (owner && repo && path) {
    try {
      const { data } = await octokit.rest.repos.getContent({
        owner,
        repo,
        path,
        headers: {
          authorization: `token ${req.body.token}`
        }
      })
      res.status(200).json({ data })
    } catch (error) {
      res.status(999).json({ error })
      console.log(error)
    }
  } else {
    res.status(400).json({ message: 'Request must have owner, repo, and path' })
  }
}