import { useContext } from 'react'
import { Project } from '@projects/Project'
import { Stack, StackDivider } from '@chakra-ui/react'
import useSWR from 'swr'
import { TeamContext } from '@contexts/TeamContext'

export default function Projects() {
  const { currentTeam } = useContext(TeamContext)
  const { data: projects } = useSWR(`/api/teams/${currentTeam}/projects`)

  return (
    <Stack spacing="8" py="5" px="8" divider={<StackDivider />}>
      {projects?.map(project => {
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
