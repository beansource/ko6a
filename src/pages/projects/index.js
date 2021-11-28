import { Project } from '@projects/Project'
import { Stack, StackDivider } from '@chakra-ui/react'
import useSWR from 'swr'

export default function Projects() {
  const { data: projects } = useSWR('/api/projects')

  return (
    <Stack spacing="8" py="5" px="8" divider={<StackDivider />}>
      {projects?.map(project => {
        return (
          <Project
            title={project.org}
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
