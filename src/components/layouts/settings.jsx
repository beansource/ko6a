import { Container, List, ListItem, HStack, Button, Flex, Box, Text } from '@chakra-ui/react'
import { Users, Brush } from 'lucide-react'
import Link from 'next/link'

const SettingsLayout = ({ children }) => {
  return (
    <Flex p='8'>
      <Box flex={1}>
        {children}
      </Box>
      <SettingsNav />
    </Flex>
  )
}

const SettingsNav = () => {
  const navItems = [
    {
      name: 'Teams',
      href: '/settings/teams',
      icon: <Users size={15} />
    },
    {
      name: 'Appearance',
      href: '/settings/appearance',
      icon: <Brush size={15} />
    }
  ]

  return (
    <List w='10rem' borderWidth='1px' borderRadius='6px' h='fit-content' mt='4' ml='4'>
      {navItems.map(item => (
        <NavItem key={item.name} {...item} />
      ))}
    </List>
  )
}

const NavItem = ({ icon, name, href }) => {
  return (
    <ListItem w='full' p='1'>
      <Link href={href} passHref>
        <Button size='sm' as='a' leftIcon={icon} w='full' justifyContent='start' bg='none'>
          <Text>
            {name}
          </Text>
        </Button>
      </Link>
    </ListItem>
  )
}

export default SettingsLayout