import { Box, useColorModeValue as mode, Icon, Stack, Flex, Circle, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { BsFillFolderFill, BsFileEarmarkCodeFill } from 'react-icons/bs'
import useSWR from 'swr'
import { useRouter } from 'next/router'
const prettyBytes = require('pretty-bytes')
import { File } from './File'
import isScriptFile from '@util/isScriptFile'

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

  // if url is a blob, show file
  if (isScriptFile(newSlugs[newSlugs.length - 1])) {
    return (
      <File />
    )
  }
  
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
      <Box onClick={() => window.location.href = `${router.asPath}/${item.name}`} cursor='pointer'>
        <ListItem
          title={JSON.stringify(item.name).replaceAll('"', '')} id={idx}
          subTitle={item.type === 'blob' ? `${prettyBytes(byteSize)}` : `${treeSize} items`}
          icon={<Icon as={item.type === 'blob' ? BsFileEarmarkCodeFill : BsFillFolderFill}
            boxSize="4" />
          }
        />
      </Box>
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
    <Stack as="li" direction="row" spacing="4" hover={{
      bg: mode('gray.50', 'gray.700'),
      rounded: "xl"
    }}>
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
      </Flex>
      <Stack spacing="4" pt="1" flex="1">
        <Flex direction="column">
          <Heading fontSize="md" fontWeight="semibold" fontFamily="mono">
            {title}
          </Heading>
          <Text fontSize="sm">
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