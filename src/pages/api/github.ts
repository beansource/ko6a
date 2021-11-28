import { graphql } from '@octokit/graphql'
import { NextApiRequest } from 'next'

export default async function handler(req: NextApiRequest, res) {
  const { repository } = await graphql({ query: `
    query repository($owner: String!, $repo: String!, $path: String) {
      repository(owner:$owner, name:$repo) {
        description
        stargazerCount
        updatedAt
        object(expression: $path) {
          ...on Tree {
            entries {
              name
              type
              object {
                ... on Blob {
                  byteSize
                }
                ... on Tree {
                  entries {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }`,
    owner: req.body.owner,
    repo: req.body.repo,
    path: req.body.path,
    headers: {
      authorization: `token ${req.body.token}`
    }
  })

  res.status(200).json({ repository })
}