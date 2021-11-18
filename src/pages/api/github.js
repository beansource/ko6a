import { Octokit } from '@octokit/rest'

const octokit = new Octokit({
  auth: process.env.GITHUB_AUTH_TOKEN
})

export default async function handler(req, res) {
  try {
    const {
      data,
    } = await octokit.repos.getContent({
      owner: req.body.owner,
      repo: req.body.repo,
      path: req.body.path
    })
    res.status(200).json({ data })
  } catch (error) {
    res.status(500).json({ error })
  }
}