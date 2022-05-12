import { useRouter } from 'next/router'
import { Container, Text, Flex, Spacer, Avatar, Skeleton } from '@chakra-ui/react'
import useSWR from 'swr'
import { format } from 'date-fns'
import { Prism } from 'react-syntax-highlighter'
import { darcula, coy } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function Result() {
  const router = useRouter()
  const { id } = router?.query

  const { data, error } = useSWR(`/api/results/${id}`)

  if (error) {
    console.log(error)
  }

  if (data?.data) {
    const { timestamp } = data?.data
    const { name, ghLogin } = data?.data?.user

    return (
      <Container maxW="container.xl">
        <Flex py="4">
          <Text>
            {timestamp && format(new Date(timestamp), 'MMMM dd, h:mm:ss aaa')}
          </Text>
          <Spacer />
          <Text mr="2">
            Run by {name && name}
          </Text>
          {ghLogin &&
            <Avatar size="xs"
              src={`https://github.com/${ghLogin}.png`}
            />
          }
        </Flex>
        <Prism language="log" wrapLines="true" wrapLongLines="true" style={coy}>
          {data?.data?.data}
        </Prism>
      </Container>
    )
  } else {
    return (
      <Container maxW="container.xl" pt="16">
        <Skeleton height="64" />
      </Container>
    )
  }
}