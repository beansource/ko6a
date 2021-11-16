import { data } from '../../_data'
import { Project } from '../../components/projects/Project'
import { useRouter } from 'next/router'

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

import { FaGithubAlt } from 'react-icons/fa'
import { BsFillFileEarmarkBinaryFill } from 'react-icons/bs'

export const Repo = props => {
  const { repo, org, children, href } = props
  const router = useRouter()

  return (
    <Box position="relative" as="a" href={`${router.asPath}/${href}`}>
      <Box fontWeight="bold" maxW="xl">
        {repo}
      </Box>
      <HStack fontSize="sm" fontWeight="medium" color={mode('gray.500', 'white')} mt="1">
        <Box as={BsFillFileEarmarkBinaryFill} fontSize="md" color="gray.400" />
        <Text>
          7b
        </Text>
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
  Button, Box, HStack,
  Divider, IconButton,
  Flex,
  Stack,
  StackDivider,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import { HiPlus } from 'react-icons/hi'