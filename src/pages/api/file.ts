import { Octokit } from '@octokit/rest'
import { NextApiRequest, NextApiResponse } from 'next'

const octokit = new Octokit({
  baseUrl: 'https://github.com/api/v3'
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { owner, repo, path }: any = JSON.parse(req.body)
  console.log(req.body)
  console.log(`🤓 ~ file: file.ts ~ line 6 ~ handler ~ owner, repo, path`, owner, repo, path);
  // if (owner && repo && path) {
  //   try {
  //     const { data } = await octokit.rest.repos.getContent({
  //       owner,
  //       repo,
  //       path: '',
  //       headers: {
  //         authorization: `token ${req.body.token}`
  //       }
  //     })
  //     console.log(data)
  //     res.status(200).json({ data })
  //   } catch (error) {
  //     res.status(999).json({ error })
  //     console.log(error)
  //   }
  // } else {
  //   res.status(400).json({ message: 'Request must have owner, repo, and path' })
  // }
  try {
    const { data } = await octokit.request('/user')
    console.log(data)
    res.status(200).json(data)
  } catch(error) {
    console.log(error)
    res.status(999).json({ error })
  }
 
}