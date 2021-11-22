import { Box, useColorModeValue as mode,
  Icon, Stack, Flex, Circle, Heading, Text } from '@chakra-ui/react'
import { BsFillFolderFill, BsFileEarmarkCodeFill } from 'react-icons/bs'
import useSWR from 'swr'
const prettyBytes = require('pretty-bytes')
import { getRepoQuery } from '../../utils/queries'
import { useToken } from '../../utils/hooks'
import React from 'react'

/**
 * Explore a Repository and its contents
 * @param {*} props 
 * @returns 
 */
export const Explorer = props => {
  const { org, repo, children } = props
  const token = useToken()
  const { data } = useSWR(['/api/github', getRepoQuery, { org, repo }, token], fetcher)

  return (
    <Box position="relative" p="8">
      <Box mt="3" maxW="xl" color={mode('gray.600', 'gray.200')}>
        {children}
      </Box>
      <Box as="section">
        <Box maxW="4xl" mx="auto" p={{ base: '4', md: '8' }}>
          <List spacing="4">
            {data?.data?.repository?.object?.entries?.map(item => {
              return (
                <ListItem
                  title={JSON.stringify(item.name).replaceAll('"', '')}
                  subTitle={item.type === 'blob' ? `${prettyBytes(item.object.byteSize)}` : null}
                  icon={<Icon as={item.type === 'blob' ? BsFileEarmarkCodeFill : BsFillFolderFill}
                    boxSize="4" />
                  }
                >
                  <Placeholder />
                </ListItem>
              )
            })}
          </List>
        </Box>
      </Box>
    </Box>
  )
}

export const ListItem = props => {
  const { title, subTitle, icon, isLastItem, children, ...stackProps } = props
  return (
    <Stack as="li" direction="row" spacing="4" {...stackProps}>
      <Flex direction="column" alignItems="center" aria-hidden="true">
        <Circle
          bg={mode('blue.500', 'blue.300')}
          size="12"
          borderWidth="4px"
          borderColor={mode('white', 'gray.800')}
          color={mode('white', 'black')}
        >
          {icon}
        </Circle>
        {!isLastItem && <Flex flex="1" borderRightWidth="1px" mb="-12" />}
      </Flex>
      <Stack spacing="4" pt="1" flex="1">
        <Flex direction="column">
          <Heading fontSize="md" fontWeight="semibold" fontFamily="mono">
            {title}
          </Heading>
          <Text fontSize="sm" color={mode('gray.600', 'gray.400')}>
            {subTitle}
          </Text>
        </Flex>
        <Flex>{children}</Flex>
      </Stack>
    </Stack>
  )
}

export const List = props => {
  const { children, ...stackProps } = props
  const items = React.useMemo(
    () =>
      React.Children.toArray(children)
        .filter(React.isValidElement)
        .map((item, index, array) =>
          index + 1 === array.length
            ? React.cloneElement(item, {
                isLastItem: true,
              })
            : item,
        ),
    [children],
  )
  return (
    <Stack as="ul" {...stackProps}>
      {items}
    </Stack>
  )
}

export const Placeholder = props => (
  <Box
    bg={mode('gray.50', 'gray.700')}
    width="full"
    height="16"
    rounded="xl"
    {...props}
  />
)

const fetcher = (url, query, variables, token) => fetch(url, {
  method: 'POST',
  body: JSON.stringify({
    query,
    variables,
    token
  }),
  headers: {
    'Content-Type': 'application/json'
  }
}).then(res => res.json())