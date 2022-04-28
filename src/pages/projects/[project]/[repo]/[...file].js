import { useContext } from 'react'
import { useRouter } from 'next/router'
import { Explorer } from '@projects/Explorer'
import useSWR from 'swr'
import { TeamContext } from '@contexts/TeamContext'

export default function FilePage({ ...props }) {
  const router = useRouter()
  const { project, repo } = router?.query
  const { currentTeam } = useContext(TeamContext)

  const canFetch = project && currentTeam && repo
  const { data: repoData, error } = useSWR(canFetch && `/api/teams/${currentTeam}/projects/${project}/repos/${repo}`)
  console.log(`🚀 ~ file: [...file].js ~ line 14 ~ FilePage ~ repoData`, repoData)

  if (error) {
    console.log(error)
  }

  if (!error && !repoData) return null

  return (
    <Explorer owner={repoData?.owner} repo={repoData?.repo} repoId={repoData?.id} />
  )
}