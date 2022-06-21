import { useContext } from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { Explorer } from '@components/projects/explorer'
import { TeamContext } from '@components/contexts/team-context'

export default function RepoPage() {
  const router = useRouter()
  const { project, repo } = router?.query
  const { currentTeam } = useContext(TeamContext)

  const canFetch = project && currentTeam && repo
  const repoQueryUrl = `/api/repos/${repo}?team=${currentTeam}&project=${project}`
  const { data: repoData, error } = useSWR(canFetch && repoQueryUrl)
  
  console.log("🚀 ~ file: [repo].js ~ line 15 ~ RepoPage ~ repoData", repoData)

  if (error) {
    console.log(error)
  }

  if (!error && !repoData) return null

  return (
    <Explorer owner={repoData?.owner} repo={repoData?.repo} repoId={repoData?.id} />
  )
}