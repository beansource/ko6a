import { useContext } from 'react'
import { useRouter } from 'next/router'
import { Explorer } from '@components/projects/explorer'
import useSWR from 'swr'
import { TeamContext } from '@components/contexts/team-context'

export default function RepoPage({ ...props }) {
  const router = useRouter()
  const { project, repo } = router?.query
  const { currentTeam } = useContext(TeamContext)

  const { data: repoData, error } = useSWR(project && currentTeam && `/api/teams/${currentTeam}/projects/${project}/repos/${repo}`)

  if (error) {
    console.log(error)
  }

  if (!error && !repoData) return null

  return (
    <Explorer owner={repoData?.owner} repo={repoData?.repo} repoId={repoData?.id} />
  )
}