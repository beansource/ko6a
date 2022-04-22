import { useState } from 'react'
import { Box, Container, Skeleton, Button, Flex, Stack, Tab, TabList, ButtonGroup,
  TabPanel, TabPanels, Tabs, Text, useColorModeValue as mode, useBreakpointValue } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { useSession } from 'next-auth/react'
import { Octokit } from '@octokit/rest'
import { $fetch } from 'ohmyfetch'
import { CodeBlock, ocean } from 'react-code-blocks'

export const File = props => {
  const { data: session, status } = useSession()
  const { owner, repo, path } = props

  const [loading, setLoading] = useState(false)
  const [consoleOutput, setConsoleOutput] = useState('Run test to see results')

  const octokit = new Octokit({
    auth: session?.accessToken
  })

  // get repo id 
  // const repoId = await repo.findFirst({
  //   where: {
  //     repo: 'k6'
  //   }
  // })
  const res = $fetch(`/api/tests?path=${path.join('/')}`)

  const { isLoading, error: repoContentError, data: repoContent, isFetching } = useQuery('repoContent', async () => {
    const data = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: path.join('/')
    })
    return data
  })
  
  if (repoContentError) {
    return (
      <Text>
        {repoContentError}
      </Text>
    )
  }

  const url = repoContent?.data?.download_url

  const { isIdle, status: rawErrorStatus, error: rawFileError, data: rawFile } = useQuery('rawFile', async () => {
    let data
    try {
      data = await $fetch(url)
    } catch (error) {
      console.log(error)
      return (
        <Text>
          {error}
        </Text>
      )
    }
    return data
  }, {
    enabled: !!url
  })

  if (rawFileError) {
    return (
      <Text>
        {rawFileError}
      </Text>
    )
  }

  const runner = () => {
    setLoading(true)
    setConsoleOutput('')
    fetch('/api/runner', { 
      method: 'POST', 
      body: JSON.stringify({
        script: url,
        path: path.join('/'),
        owner,
        testId: res.id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      const reader = res.body.getReader()
      const chunks = []

      async function stream() {
        const { value, done } = await reader.read()
        if (done) {
          setLoading(false)
          return chunks
        }
        let log = new TextDecoder().decode(value)
        setConsoleOutput(oldArr => oldArr + log)
        scrollToBottom('console')
        chunks.push(value)
        return stream()
      }
      return stream()
    })
  }
  const isMobile = useBreakpointValue({ base: true, md: false })
  console.log(res)

  return (
    <Tabs isFitted variant="enclosed">
      <Flex direction="column" align="stretch" minH="100vh">
        <Box px="8" pt="8">
          <Box maxW="7xl" mx="auto">
            <Flex justify="space-between" align="center">
              <TabList
                position="relative"
                w={{
                  base: '100%',
                  md: 'auto',
                }}
              >
                <Tab fontWeight="semibold" _focus={{
                  outline: 'none'
                }}>Results</Tab>
                <Tab fontWeight="semibold" _focus={{
                  outline: 'none'
                }}>Output</Tab>
                <Tab fontWeight="semibold" _focus={{
                  outline: 'none'
                }}>Source</Tab>
              </TabList>
              <Stack direction="row">
                <ButtonGroup size="sm" isAttached variant="outline">
                  <Button mr="-px" onClick={runner}
                    isLoading={loading} loadingText="Running"
                  >
                    Run
                  </Button>
                  <Button onClick={() => {
                    if (!loading) {
                      setConsoleOutput('Run test to see results')
                  }}}>
                    Clear
                  </Button>
                </ButtonGroup>
              </Stack>
            </Flex>
          </Box>
        </Box>
        <Box px="8" flex="1">
          <Box maxW="7xl" mx="auto">
            <TabPanels mt="5" h="full">
              <TabPanel>
                list of results
              </TabPanel>
              <TabPanel>
                <Box bg="gray.700" borderRadius="12" my={4} maxH={'container.md'} minW={'full'}
                  maxW={'container.lg'} overflow="scroll" id="console"
                >
                  <Text style={{ whiteSpace: 'pre-line' }} color="white" p="5">
                    <pre>{consoleOutput}</pre>
                  </Text>
                </Box>
              </TabPanel>
              <TabPanel>
                <Script loading={loading} rawFile={rawFile} rawErrorStatus={rawErrorStatus} />
              </TabPanel>
            </TabPanels>
          </Box>
        </Box>
      </Flex>
    </Tabs>
  )
}

import { HiChartBar } from 'react-icons/hi'
import { FaGithubAlt } from 'react-icons/fa'
import { FcSportsMode } from 'react-icons/fc'

export const Script = props => {
  return (
    <Box as="main" py="8" flex="1" {...props}>
      <Container maxW="7xl">
        <Skeleton isLoaded={props.rawErrorStatus === 'success'}>
          <CodeBlock
            text={props.rawFile ?? '...'}
            language="js"
            showLineNumbers={true}
            theme={ocean}
          />
        </Skeleton>
      </Container>
    </Box>
  )
}

const scrollToBottom = e => {
  const div = document.getElementById(e)
  div.scrollTop = div.scrollHeight - div.clientHeight
}