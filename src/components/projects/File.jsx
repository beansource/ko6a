import { useState } from 'react'
import { Box, Container, Skeleton, Button, Divider, Flex, Heading, HStack, Tab, TabList, 
  TabPanel, TabPanels, Tabs, Text, useColorModeValue as mode, IconButton, Tooltip } from '@chakra-ui/react'
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
    setConsoleOutput('')
    fetch('/api/runner', { 
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
          let log = new TextDecoder().decode(value)
          console.log(log)
          setConsoleOutput(oldArr => oldArr + log)
          scrollToBottom('console')
          chunks.push(value)
          return pump()
        })
      }
      return pump()
    })
  }

  return (
    <Tabs isFitted>
      <Flex direction="column" align="stretch" minH="100vh">
        <Box bg={mode('gray.50', 'gray.800')} px="8" pt="8">
          <Box maxW="7xl" mx="auto">
            <Flex
              direction={{
                base: 'column',
                md: 'row',
              }}
              justify="space-between"
              align="flex-start"
              mb="10"
            >
              <HStack
                mb={{
                  base: '4',
                  md: '0',
                }}
              >
                <Heading size="lg">Script</Heading>
              </HStack>
              <HStack
                spacing={{
                  base: '2',
                  md: '4',
                }}
              >
                <Button
                  bg={mode('white', 'inherit')}
                  variant="outline"
                  leftIcon={<FcSportsMode />}
                  fontSize="sm"
                  onClick={runner}
                  isLoading={loading} loadingText="Running"
                >
                  Run Test
                </Button>
                <Tooltip label="View on GitHub" openDelay={750} placement="top">
                  <IconButton isRound variant="outline" colorScheme="gray" icon={<FaGithubAlt />} />
                </Tooltip>
              </HStack>
            </Flex>
            <Flex justify="space-between" align="center">
              <TabList
                border="0"
                position="relative"
                zIndex={1}
                w={{
                  base: '100%',
                  md: 'auto',
                }}
              >
                <Tab fontWeight="semibold">Results</Tab>
                <Tab fontWeight="semibold">Source</Tab>
              </TabList>
              <Text 
                onClick={() => {
                  if (!loading) {
                    setConsoleOutput('Run test to see results')
                }}}
                cursor="pointer"
                fontWeight="semibold"
                color={mode('blue.600', 'blue.300')}
                fontSize="sm"
                display={{
                  base: 'none',
                  md: 'block',
                }}
              >
                <Box as={HiChartBar} fontSize="sm" display="inline-block" marginEnd="2" />
                Clear console
              </Text>
            </Flex>
          </Box>
        </Box>
        <Box pos="relative" zIndex={0}>
          <Divider borderBottomWidth="2px" opacity={1} borderColor={mode('gray.100', 'gray.700')} />
        </Box>
        <Box px="8" flex="1">
          <Box maxW="7xl" mx="auto">
            <TabPanels mt="5" h="full">
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