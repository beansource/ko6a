import { useRouter } from 'next/router'
import { Repo } from '@projects/Repo'
import { Explorer } from '@projects/Explorer'
import { Stack, StackDivider, Heading, Box } from '@chakra-ui/react'
import useSWR from 'swr'

export default function Project({ ...props }) {
  const router = useRouter()
  const slug = router?.query?.slug

  // shows contents of repo
  if (slug && slug.length > 1) {
    return (
      <Explorer owner={slug[0]} repo={slug[1]} />
    )
  }

  const { data: project, error } = useSWR(slug && `/api/projects/${slug[0]}`)

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
