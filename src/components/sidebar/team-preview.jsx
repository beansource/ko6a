import { useUser } from '@hooks'
import { NavSectionTitle } from '@components/nav-section-title'
import SidebarLink from './sidebar-link'
import { Avatar, Stack } from '@chakra-ui/react'

const TeamPreview = ({ teammates, currentTeam }) => {
  return (
    <Stack pb="6">
      <NavSectionTitle>
        {currentTeam}
      </NavSectionTitle>
      {teammates?.map((teammate, index) => (
        <TeamMember key={index} ghLogin={teammate.ghLogin} />
      ))}
    </Stack>
  )
}

const TeamMember = ({ ghLogin, ...props }) => {
  const { user } = useUser(ghLogin)
  const { name, avatarUrl } = user
  return (
    <SidebarLink
      avatar={<Avatar bg="none" size="xs" name={name} src={avatarUrl} />}
    >
      {name}
    </SidebarLink>
  )
}

export default TeamPreview