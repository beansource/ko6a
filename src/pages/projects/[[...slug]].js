export default function Projects() {
  const router = useRouter()
  const [projects, setProjects] = useState([])
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
      <Stack spacing="8" py="5" px="8" divider={<StackDivider />}>
        {repos?.map(repo => {
          return (
            <Repo
              org={repo.org}
              repo={repo.repo}
              href={repo.repo}
              description={repo.description}
            />
          )
        })}
      </Stack>
    )
  }

  // shows projects
  return (
    <Stack spacing="8" py="5" px="8" divider={<StackDivider />}>
      {projects.map(project => {
        return (
          <Project
            title={project.name}
            repos={project?.repos?.length ?? 0}
            href={project.name}
          >
            {project.description}
          </Project>
        )
      })}
    </Stack>
  )
}

import { useRouter } from 'next/router'
import { Project } from '@projects/Project'
import { Repo } from '@projects/Repo'
import { Explorer } from '@projects/Explorer'

import {
  Stack,
  StackDivider
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

