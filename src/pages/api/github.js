import { graphql } from '@octokit/graphql'

export default async function handler(req, res) {
  const { body } = req;
  const data = await graphql({ 
    query: body.query, 
    ...body.variables, 
    headers: {
      authorization: `token ${body.token}`
    }
  });
  
  res.status(200).json({ data });
}