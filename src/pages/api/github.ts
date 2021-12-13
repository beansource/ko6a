import { graphql } from '@octokit/graphql'
import { NextApiRequest } from 'next'
import { getSession } from 'next-auth/react'

export default async function handler(req: NextApiRequest, res) {
  const session = await getSession({ req })
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
      authorization: `token ${session.accessToken}`
    }
  })

  res.status(200).json({ repository })
}