import { Team } from '@teams/Team'
import { useRouter } from 'next/router'

export default function ManageTeam() {
  const router = useRouter()
  const { id } = router?.query

  return (
    <Team teamName={id}/>
  )
}
