import { graphql } from '@octokit/graphql'
import { getViewerQuery, getFollowersQuery, getUserQuery } from './queries'

export const queryGithub = async (token, query, variables={}) => await graphql({ query, ...variables,
  headers: {
    authorization: `token ${token}`
  }
})

export const getUser = async (token, login) => await queryGithub(token, getUserQuery, { login })
export const getViewer = async token => await queryGithub(token, getViewerQuery)
export const getFollowers = async token => await queryGithub(token, getFollowersQuery)