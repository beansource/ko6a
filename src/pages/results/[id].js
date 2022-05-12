import { useRouter } from 'next/router'
import { Container, Text, Flex, Spacer, Avatar, Skeleton, Divider } from '@chakra-ui/react'
import { NavBreadcrumb } from '@components/nav-breadcrumb'
import useSWR from 'swr'
import { format } from 'date-fns'
import { Prism } from 'react-syntax-highlighter'
import { coy } from 'react-syntax-highlighter/dist/cjs/styles/prism'

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
        <Flex w="full" py="4" justify="space-between" align="center" px="10">
          <Flex align="center" minH="8">
            <NavBreadcrumb results={data?.data?.test} />
          </Flex>
          <Spacer />
        </Flex>
        <Flex py="8" px="16">
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
        <Divider />
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