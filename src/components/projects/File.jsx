import { Box, Container, Skeleton, useColorModeValue } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { useSession } from 'next-auth/react'
import { Octokit } from '@octokit/rest'
import { $fetch } from 'ohmyfetch'
import { CodeBlock, ocean } from 'react-code-blocks'

export const File = props => {
  const { data: session, status } = useSession()
  const { owner, repo, path } = props

  const octokit = new Octokit({
    auth: session?.accessToken
  })

  const { isLoading, error: repoContentError, data: repoContent, isFetching } = useQuery('repoContent', async () => {
    const data = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: path.join('/')
    })
    return data
  })
  
  if (repoContentError) console.log(repoContentError)
  if (repoContent) console.log(repoContent)

  const url = repoContent?.data?.download_url

  const { isIdle, status: rawErrorStatus, error: rawFileError, data: rawFile } = useQuery('rawFile', async () => {
    let data
    try {
      data = await $fetch(url)
    } catch (error) {
      console.log(error)
    }
    return data
  }, {
    enabled: !!url
  })
  if (rawFile) console.log(rawFile)
  if (rawFileError) console.log(rawFileError)

  return (
    <Box as="main" py="8" flex="1" {...props}>
      <Container maxW="7xl">
        <Skeleton isLoaded={rawErrorStatus === 'success'}>
          <CodeBlock
            text={rawFile ?? '...'}
            language="js"
            showLineNumbers={true}
            theme={ocean}
          />
        </Skeleton>
      </Container>
    </Box>
  )
}