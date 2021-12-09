export const getViewerQuery = `
  query { 
    viewer { 
      name
      email
      avatarUrl
      bio
      login
    }
  }`

export const getFollowersQuery = `
  query { 
    viewer { 
      login
      followers(first: 3) {
        nodes {
          name
          avatarUrl
          login
        }
      }
    }
  }`

export const getUserQuery = `
  query user($login: String!) { 
    user (login: $login) {
      name
      email
      avatarUrl
      bio
      login
    }
  }`

export const getRepoQuery = `
  query repository($owner: String!, $repo: String!) {
    repository(owner:$owner, name:$repo) {
      description
      stargazerCount
      updatedAt
      object(expression: "HEAD:") {
        ...on Tree {
          entries {
            name
            type
            object {
              ... on Blob {
                byteSize
              }
            }
          }
        }
      }
    }
  }`