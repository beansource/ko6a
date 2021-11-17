import { data } from '../../_data'
import { Project } from '../../components/projects/Project'
import { useRouter } from 'next/router'
import { Explorer } from '../../components/projects/Explorer'

export default function Projects() {
  const router = useRouter()
  let { slug } = router?.query
  if (slug) {
    // shows contents of repo
    if (slug[1]) {
      return (
        <Explorer org={slug[0]} repo={slug[1]} />
      )
    }

    const repos = data?.projects?.find(({ org }) => org.toLowerCase() == slug).repos

    // shows list of repos
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
        </Box>
      </Box>
    )
  }

  // shows projects
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
        <Stack spacing="4" py="5" px="8" divider={<StackDivider />}>
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
      </Box>
    </Box>
  )
}

import { FaGithubAlt } from 'react-icons/fa'
import { BsFillFileEarmarkBinaryFill } from 'react-icons/bs'
import { LinkBox, LinkOverlay } from '@chakra-ui/react'

export const Repo = props => {
  const { repo, org, children, href } = props
  const router = useRouter()

  return (
    <LinkBox position="relative" transition="ease-in-out"
      _hover={{
        transform: 'scale(1.01)',
        transition: '0.3s'
      }}
    >
      <LinkOverlay as="a" href={`${router.asPath}/${href}`}>
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
      </LinkOverlay>
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
          as="a" href={`https://github.com/${org}/${repo}`} target="_blank"
        />
      </HStack>
    </LinkBox>
  )
}

import {
  Box, HStack,
  IconButton,
  Stack,
  StackDivider,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'