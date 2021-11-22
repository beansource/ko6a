import { data } from '../../_data'
import { useRouter } from 'next/router'
import { Project } from '@projects/Project'
import { Repo } from '@projects/Repo'
import { Explorer } from '@projects/Explorer'
import useSWR from 'swr'

export default function Projects(props) {
  const router = useRouter()
  let { slug } = router?.query
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