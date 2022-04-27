import { useContext } from 'react'
import { useRouter } from 'next/router'
import { Repo } from '@projects/Repo'
import { Stack, StackDivider, Heading, Box } from '@chakra-ui/react'
import useSWR from 'swr'
import { TeamContext } from '@contexts/TeamContext'

export default function Project({ ...props }) {
  const router = useRouter()
  const { project: projectName } = router?.query
  const { currentTeam } = useContext(TeamContext)

  const { data: project, error } = useSWR(projectName && `/api/teams/${currentTeam}/projects/${projectName}`)

  if (error) return 'scawy :('
  if (!project) return null

  // shows list of repos
  return (
    <Box p="8">
      {/* todo: figure out a clean way of making it clear a project contains a list of repos */}
      <Heading pb="2">repos</Heading>
      <Stack spacing="8" py="5" divider={<StackDivider />}>
        {project?.repos?.map(repo => {
          return (
            <Repo
              owner={repo.owner}
              name={repo.repo}
              href={repo.repo}
              description={repo.description}
            />
          )
        })}
      </Stack>
    </Box>
  )
}
