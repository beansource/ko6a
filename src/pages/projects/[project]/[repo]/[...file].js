import { useRouter } from 'next/router'
import { Explorer } from '@projects/Explorer'
import useSWR from 'swr'

export default function FilePage({ ...props }) {
  const router = useRouter()
  const { project, repo } = router?.query

  const { data: repoData, error } = useSWR(project && `/api/projects/${project}/${repo}`)

  if (error) {
    console.log(error)
  }

  if (!error && !repoData) return null

  return (
    <Explorer owner={repoData?.owner} repo={repoData?.repo} />
  )
}