import { useUser } from '@hooks'
import { NavSectionTitle } from '@components/nav-section-title'
import { Avatar, HStack, Stack, Text } from '@chakra-ui/react'

const TeamPreview = ({ teammates, currentTeam }) => {
  return (
    <Stack pb='6'>
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
    <HStack
      fontSize='sm' px='3' py='1' {...props}
    >
      <Avatar bg='none' size='xs' name={name} src={avatarUrl} />
      <Text>
        {name}
      </Text>
    </HStack>
  )
}

export default TeamPreview