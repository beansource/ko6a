import { data } from '../../_data'
import { useRouter } from 'next/router'
import { Project } from '../../components/projects/Project'
import { Repo } from '../../components/projects/Repo'
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

import {
  Box,
  Stack,
  StackDivider,
  useColorModeValue as mode,
} from '@chakra-ui/react'