import { Box, useColorModeValue as mode, Icon, Stack, Flex, Circle, Heading, Text } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { BsFillFolderFill, BsFileEarmarkCodeFill } from 'react-icons/bs'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { File } from './file'
import isScriptFile from '@util/is-script-file'
import Link from 'next/link'
const prettyBytes = require('pretty-bytes')

/**
 * Explore a Repository and its contents
 * @param {*} props
 * @returns 
 */
export const Explorer = props => {
  const { owner, repo, children, repoId } = props
  
  const router = useRouter()
  const { file } = router.query
  let filePath = file ?? []

  // if url is a blob, show file
  if (isScriptFile(filePath[filePath.length - 1])) {
    return (
      <File owner={owner} repo={repo} path={filePath} repoId={repoId} />
    )
  }
  
  const path = `HEAD:${filePath?.join('/')}`
  const { data, error } = useSWR(['/api/github', owner, repo, path], fetcher)

  if (error) {
    return (
      <Text>
        {JSON.stringify(error)}
      </Text>
    )
  }

  const contents = data?.repository?.object?.entries?.map((item, idx) => {
    let byteSize, treeSize
    if (item?.type === 'blob') {
      byteSize = item.object.byteSize
    } else if (item?.type === 'tree') {
      treeSize = item.object?.entries?.length
    }

    return (
      <Link href={`${router.asPath}/${item.name}`}>
        <Box cursor='pointer'>
          <ListItem
            title={JSON.stringify(item.name).replaceAll('"', '')} id={idx} key={idx}
            subTitle={item.type === 'blob' ? `${prettyBytes(byteSize)}` : `${treeSize} items`}
            icon={
              <Icon as={item.type === 'blob' ? BsFileEarmarkCodeFill : BsFillFolderFill}  boxSize="4"/>
            }
          />
        </Box>
      </Link>
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
    <Stack direction="row" spacing="4">
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
      <Stack spacing="4" pt="1" flex="1" transition="0.3s" _hover={{
          transform: 'translateX(0.3em)'
        }}
      >
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
  const items = useMemo(
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
      path
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
}