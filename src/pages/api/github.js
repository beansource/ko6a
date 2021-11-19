import { graphql } from '@octokit/graphql'

export default async function handler(req, res) {
  const { repository } = await graphql({query: `
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
      authorization: `token ${process.env.GITHUB_AUTH_TOKEN}`
    }
  })
  res.status(200).json({ repository })
}