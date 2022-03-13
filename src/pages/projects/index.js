import { useContext } from 'react'
import { Project } from '@projects/Project'
import { Stack, StackDivider, Center, Text, VStack } from '@chakra-ui/react'
import { TeamContext } from '@contexts/TeamContext'
import useSWR from 'swr'

export default function Projects() {
  const { currentTeam } = useContext(TeamContext)
  const { data: projects } = useSWR(`/api/teams/${currentTeam}/projects`)

  if (projects?.length === 0) {
    return (
      <Center w='full' h='full'>
        <VStack>
          <Text fontSize='5xl'>🤔</Text>
          <Text fontSize='xl'>Looks like you have no projects yet :(</Text>
        </VStack>
      </Center>
    )
  }

  return (
    <Stack spacing="6" py="5" px="8" divider={<StackDivider />}>
      {projects?.map(project => {
        return (
          <Project
            title={project.name}
            repos={project?.repos?.length ?? 0}
            href={project.name}
            key={project.name}
            description={project.description}
          />
        )
      })}
    </Stack>
  )
}
