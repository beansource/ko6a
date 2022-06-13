import { Team } from '@components/teams/team'
import { useRouter } from 'next/router'

export default function ManageTeam() {
  const router = useRouter()
  const { name } = router?.query

  return (
    <Team teamName={name}/>
  )
}
