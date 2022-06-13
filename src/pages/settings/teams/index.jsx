import { Container, Heading, List, ListItem, Text, Image, HStack, Spacer, Button, VStack } from '@chakra-ui/react'
import { useUser } from '@util/hooks'
import Link from 'next/link'

const TeamSettingsHome = () => {
  const { user } = useUser()
  const teams = user?.teams.filter(team => team.name !== user.defaultTeam)
  const empty = teams.length == 0
  
  return (
    <Container maxW='4xl'>
      <Heading as="h2" fontSize='24px' mb='4'>
        Teams
      </Heading>
      {empty ?
        <VStack align='left'>
          <Text>
            Not on any teams
          </Text>
          <Image
            width='60' height='60'
            src='/atomic-list-is-empty-1.png'
          />
        </VStack>
      :
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
      }
    </Container>
  )
}

export default TeamSettingsHome