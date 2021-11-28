import { Box, useColorModeValue as mode, Icon, Stack, Flex, Circle, Heading, Text, LinkBox, LinkOverlay } from '@chakra-ui/react'
import React from 'react'
import { BsFillFolderFill, BsFileEarmarkCodeFill } from 'react-icons/bs'
import useSWR from 'swr'
import { useRouter } from 'next/router'
const prettyBytes = require('pretty-bytes')

/**
 * Explore a Repository and its contents
 * @param {*} props 
 * @returns 
 */
export const Explorer = props => {
  const { owner, repo, children } = props
  
  const router = useRouter()
  const { slug } = router.query
  const newSlugs = slug?.slice(2, slug.length + 1)
  
  const path = `HEAD:${newSlugs?.join('/')}`
  const { data } = useSWR(['/api/github', owner, repo, path], fetcher)

  const contents = data?.repository?.object?.entries?.map((item, idx) => {
    let byteSize, treeSize
    if (item?.type === 'blob') {
      byteSize = item.object.byteSize
    } else if (item?.type === 'tree') {
      treeSize = item.object?.entries?.length
    }
    return (
      <LinkBox>
        <LinkOverlay href={`${router.asPath}/${item.name}`}>
          <ListItem
            title={JSON.stringify(item.name).replaceAll('"', '')} id={idx}
            subTitle={item.type === 'blob' ? `${prettyBytes(byteSize)}` : `${treeSize} items`}
            icon={<Icon as={item.type === 'blob' ? BsFileEarmarkCodeFill : BsFillFolderFill}
              boxSize="4" />
            }
          >
            <Placeholder />
          </ListItem>
        </LinkOverlay>
      </LinkBox>
    )
  })

  return (
    <Box position="relative" p="8">
      <Box mt="3" maxW="xl" color={mode('gray.600', 'gray.200')}>
        {children}
      </Box>
      <Box as="section">
        <Box maxW="4xl" mx="auto" p={{ base: '4', md: '8' }}>
          <List spacing="4">
            {contents}
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

const fetcher = (url, owner, repo, path) => {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      owner,
      repo,
      path,
      token: window.localStorage.getItem('ko6aToken')
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
}