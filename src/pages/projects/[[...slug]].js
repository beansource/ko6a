import { data } from '../../_data'

export default function Projects() {
  const router = useRouter()
  let { slug } = router?.query
  
  return (
    <Box
      maxW={{
        base: 'xl',
        md: '7xl',
      }}
      mx="auto"
      px={{
        md: '8',
      }}
    >
      <Box
        rounded={{
          lg: 'lg',
        }}
        bg={mode('white', 'gray.700')}
        maxW="3xl"
        mx="auto"
        shadow="base"
        overflow="hidden"
      >
        <Flex align="center" justify="space-between" px="6" py="4">
          <Text as="h3" fontWeight="bold" fontSize="lg">
            Projects
          </Text>
          <Button minW="20" leftIcon={<HiPlus />}>
            Add
          </Button>
        </Flex>
        <Divider />
        <Explorer slug={slug} />
      </Box>
    </Box>
  )
}

export const Explorer = props => {
  if (props.slug) {
    const repos = data?.projects?.find(({ slug }) => slug === props.slug.toString()).repos
    return (
      <Stack spacing="6" py="5" px="8" divider={<StackDivider />}>
        {repos?.map(repo => {
          console.log(repo)
          return (
            <Repo
              org={repo.org}
              repo={repo.repo}
              href={repo.repo}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, totam at
              reprehenderit maxime aut beatae ad.
            </Repo>
          )
        })}
      </Stack>
    )
  }
  return (
    <Stack spacing="6" py="5" px="8" divider={<StackDivider />}>
      {data?.projects.map(project => {
        return (
          <Project
            title={project.org}
            repos={project?.repos?.length ?? 0}
            href={project.slug}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, totam at
            reprehenderit maxime aut beatae ad.
          </Project>
        )
      })}
    </Stack>
  )
}

import { Box, HStack, IconButton } from '@chakra-ui/react'
import { HiCollection, HiPencilAlt, HiTrash } from 'react-icons/hi'
import { useRouter } from 'next/router'
import plur from 'plur'

export const Project = props => {
  const router = useRouter()
  const { title, children, repos, href } = props

  return (
    <Box position="relative" as="a" href={`${router.asPath}/${href}`}>
      <Box fontWeight="bold" maxW="xl">
        {title}
      </Box>
      <HStack fontSize="sm" fontWeight="medium" color={mode('gray.500', 'white')} mt="1">
        <Box as={HiCollection} fontSize="md" color="gray.400" />
        <span>{repos} {plur('repository', repos)}</span>
      </HStack>
      <Box mt="3" maxW="xl" color={mode('gray.600', 'gray.200')}>
        {children}
      </Box>
      <HStack
        position={{
          sm: 'absolute',
        }}
        top={{
          sm: '0',
        }}
        insetEnd={{
          sm: '0',
        }}
        mt={{
          base: '4',
          sm: '0',
        }}
      >
        <IconButton aria-label="Edit" icon={<HiPencilAlt />} rounded="full" size="sm" />
        <IconButton aria-label="Delete" icon={<HiTrash />} rounded="full" size="sm" />
      </HStack>
    </Box>
  )
}

import { FaGithubAlt } from 'react-icons/fa'

export const Repo = props => {
  const { repo, org, children, href } = props
  const router = useRouter()

  return (
    <Box position="relative" as="a" href={`${router.asPath}/${href}`}>
      <Box fontWeight="bold" maxW="xl">
        {repo}
      </Box>
      <HStack fontSize="sm" fontWeight="medium" color={mode('gray.500', 'white')} mt="1">
        <Box as={HiCollection} fontSize="md" color="gray.400" />
      </HStack>
      <Box mt="3" maxW="xl" color={mode('gray.600', 'gray.200')}>
        {children}
      </Box>
      <HStack
        position={{
          sm: 'absolute',
        }}
        top={{
          sm: '0',
        }}
        insetEnd={{
          sm: '0',
        }}
        mt={{
          base: '4',
          sm: '0',
        }}
      >
        <IconButton aria-label="Git" icon={<FaGithubAlt />} rounded="full" size="sm" 
          href={`https://github.com/${org}/${repo}`} isExternal
        />
      </HStack>
    </Box>
  )
}

import {
  Button,
  Divider,
  Flex,
  Stack,
  StackDivider,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import { HiPlus } from 'react-icons/hi'