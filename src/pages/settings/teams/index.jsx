import { Container, Heading, List, ListItem, Text, Image, HStack, Spacer, Button } from '@chakra-ui/react'
import { useUser } from '@util/hooks'
import Link from 'next/link'

const TeamSettingsHome = () => {
  const { user } = useUser()
  const teams = user?.teams.filter(team => team.name !== user.defaultTeam)
  
  return (
    <Container maxW='4xl'>
      <Heading as="h2" fontSize='24px' mb='4'>
        Teams
      </Heading>
      <List borderWidth='1px' borderRadius='6px' borderStyle='solid'>
        {teams.map(team => (
          <ListItem key={team.id} padding='16px'>
            <HStack>
              <Image
                width='30px' height='30px' borderRadius='50%'
                src={team.avatarUrl ?? `https://avatars.dicebear.com/api/jdenticon/${team.name}.svg`}
              />
              <Text>
                {team.name}
              </Text>
              <Spacer />
              <Link href={`/settings/teams/${team.name}`} passHref>
                <Button size='sm' as='a'>
                  Settings
                </Button>
              </Link>
            </HStack>
          </ListItem>
        ))}
      </List>
    </Container>
  )
}

export default TeamSettingsHome