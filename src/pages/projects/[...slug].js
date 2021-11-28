import { useRouter } from 'next/router'
import { Repo } from '@projects/Repo'
import { Explorer } from '@projects/Explorer'
import { Stack, StackDivider, Heading, Box } from '@chakra-ui/react'
import useSWR from 'swr'

export default function Project(props) {
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
  // todo: fix this it's borked cause of new prisma stuff
  return (
    <Box mt="-8">
      {/* todo: figure out a clean way of making it clear a project contains a list of repos */}
      <Heading pb="2">repos</Heading>
      <Stack spacing="8" py="5" px="8" divider={<StackDivider />}>
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

const fetcher = (url, owner, repo, path) => fetch(url, {
  method: 'POST',
  body: JSON.stringify({
    owner,
    repo,
    path
  }),
  headers: {
    'Content-Type': 'application/json'
  }
}).then(res => res.json())
