import { useState } from 'react'
import { Box, Container, Skeleton, Button } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { useSession } from 'next-auth/react'
import { Octokit } from '@octokit/rest'
import { $fetch } from 'ohmyfetch'
import { CodeBlock, ocean } from 'react-code-blocks'

export const File = props => {
  const { data: session, status } = useSession()
  const { owner, repo, path } = props

  const [loading, setLoading] = useState(false)

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
  
  if (rawFileError) console.log(rawFileError)


const runner = () => {
  setLoading(true)

  fetch('/api/runner',
  { 
    method: 'POST', 
    body: JSON.stringify({
      script: url,
      path: path.join('/')
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    const reader = res.body.getReader()
    const chunks = []

    function pump() {
      return reader.read().then(({ value, done }) => {
        if (done) {
          setLoading(false)
          return chunks
        }
        let x = new TextDecoder().decode(value)

        console.log(x)
        // setConsoleOutput(oldArr => oldArr + x)
        // scrollToBottom('daTerminal')

        chunks.push(value)
        return pump()
      })
    }
    return pump()
  })
}

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
        <Button isLoading={loading} loadingText="Running" onClick={runner} color="#2f4f58">
          Run
        </Button>
      </Container>
    </Box>
  )
}
