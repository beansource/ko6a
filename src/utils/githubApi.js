import { graphql } from '@octokit/graphql'
import { getViewerQuery, getFollowersQuery } from './queries'

export const queryGithub = async (token, query) => await graphql({ query,
  headers: {
    authorization: `token ${token}`
  }
})

export const getViewer = async token => await queryGithub(token, getViewerQuery)
export const getFollowers = async token => await queryGithub(token, getFollowersQuery)