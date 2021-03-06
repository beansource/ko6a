import { useEffect, useState } from 'react'
import { Box, Container, Skeleton, Button, Flex, Stack, Tab, TabList, ButtonGroup,
  TabPanel, TabPanels, Tabs, Text, VStack, HStack } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { useSession } from 'next-auth/react'
import { Octokit } from '@octokit/rest'
import { $fetch } from 'ohmyfetch'
import { CodeBlock, ocean } from 'react-code-blocks'
import Image from 'next/image'
import plur from 'plur'

export const File = props => {
  const { data: session, status } = useSession()
  const { owner, repo, path } = props

  const [loading, setLoading] = useState(false)

  const [testId, updateTestId] = useState()
  const [results, updateResults] = useState([])

  const octokit = new Octokit({
    auth: session?.accessToken
  })

  // api route things, either post new test or get existing test from db
  useEffect(() => {
    async function something() {
      const res = await $fetch(`/api/tests`, {
        method: 'POST',
        body: JSON.stringify(props)
      })
      updateTestId(res?.data?.id)
      updateResults(res?.data?.results)
    }

    something()
  }, [])

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
    fetch('/api/runner', {
      method: 'POST', 
      body: JSON.stringify({
        script: url,
        path: path.join('/'),
        owner,
        testId
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

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
                }}>Source</Tab>
              </TabList>
              <Stack direction="row">
                <Button onClick={runner} variant="outline"
                  isLoading={loading} loadingText="Running"
                >
                  Run
                </Button>
              </Stack>
            </Flex>
          </Box>
        </Box>
        <Box px="8" flex="1">
          <Box maxW="7xl" mx="auto">
            <TabPanels mt="5" h="full">
              <TabPanel>
                <Results results={results} />
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

import ResultsTable from '@components/results/table'

export const Results = props => {
  if (props.results?.length > 0) {
    return (
      <Container maxW="fit">
        <Box
          bg="bg-surface"
          boxShadow={{
            base: 'none',
            md: 'sm',
          }}
        >
          <Stack spacing="5">
            <Box overflowX="auto">
              <ResultsTable results={props.results} />
            </Box>
            <Box
              px="4"
              pb="5"
            >
              <HStack spacing="3" justify="space-between">
                <Text color="muted" fontSize="sm">
                  Showing {props.results?.length} {plur('result', props.results?.length)}
                </Text>
                <ButtonGroup
                  spacing="3"
                  justifyContent="space-between"
                  width={{
                    base: 'full',
                    md: 'auto',
                  }}
                  variant="outline"
                >
                  <Button disabled>Previous</Button>
                  <Button disabled>Next</Button>
                </ButtonGroup>
              </HStack>
            </Box>
          </Stack>
        </Box>
      </Container>
    )
  } else {
    return (
      <Container maxW="container.lg">
        <VStack spacing="16">
          <Image src="/atomic-list-is-empty-1.png" alt="error" width="350" height="350" />
          <Text fontSize="xl">This test has not been run yet</Text>
        </VStack>
      </Container>
    )
  }
}