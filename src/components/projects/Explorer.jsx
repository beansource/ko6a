import { Box, useColorModeValue as mode,
  Icon, Stack, Flex, Circle, Heading, Text } from '@chakra-ui/react'
import { BsFillFolderFill, BsFileEarmarkCodeFill } from 'react-icons/bs'
import useSWR from 'swr'

/**
 * Explore a Repository and its contents
 * @param {*} props 
 * @returns 
 */
export const Explorer = props => {
  const { org, repo, children } = props
  try {
    const { data } = useSWR(['/api/github', org, repo], fetcher)
    console.log(data)
  } catch (error) {
    console.log(error)
  }

  return (
    <Box position="relative" p="8">
      <Box mt="3" maxW="xl" color={mode('gray.600', 'gray.200')}>
        {children}
      </Box>
      <Box as="section">
        <Box maxW="4xl" mx="auto" p={{ base: '4', md: '8' }}>
          <List spacing="4">
            {data?.data?.map(item => {
              return (
                <ListItem
                  title={JSON.stringify(item.name).replaceAll('"', '')}
                  subTitle={`${item.size}b`}
                  icon={<Icon as={item.type === 'dir' ? BsFillFolderFill : BsFileEarmarkCodeFill} boxSize="4" />}
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

import * as React from 'react'

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

const fetcher = (url, owner, repo) => fetch(url, {
  method: 'POST', 
  body: JSON.stringify({
    owner,
    repo
  }),
  headers: {
    'Content-Type': 'application/json'
  }
}).then(res => res.json());