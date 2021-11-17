import { data } from '../../_data'
import { useRouter } from 'next/router'
import { Project } from '@projects/Project'
import { Repo } from '@projects/Repo'
import { Explorer } from '@projects/Explorer'
import { getAllRepos } from '@data/supabase'

export default function Projects() {

  getAllRepos().then(({ data, error }) => {
    console.log('user has repos:', data)
  })

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
      {data?.projects.map(project => {
        return (
          <Project
            title={project.org}
            repos={project?.repos?.length ?? 0}
            href={project.slug}
          >
            {project.description}
          </Project>
        )
      })}
    </Stack>
  )
}

import {
  Stack,
  StackDivider
} from '@chakra-ui/react'