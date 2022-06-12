import { Container, List, ListItem, HStack, Button, Flex, Box, Text, Spacer, Divider, StackDivider } from '@chakra-ui/react'
import { Brush, Swords, User } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const SettingsLayout = ({ children }) => {
  return (
    <Flex flexDir='column' p='8'>
      <Flex w='full'>
        <Spacer />
        <SettingsNav />
        <Spacer />
      </Flex>
      <Box flex={1}>
        {children}
      </Box>
    </Flex>
  )
}

const SettingsNav = () => {
  const navItems = [
    {
      name: 'Profile',
      href: '/settings/profile',
      icon: <User size={15} />
    },
    {
      name: 'Teams',
      href: '/settings/teams',
      icon: <Swords size={15} />
    },
    {
      name: 'Appearance',
      href: '/settings/appearance',
      icon: <Brush size={15} />
    }
  ]

  return (
    <HStack
      borderWidth='1px' borderRadius='6px'
      w='fit-content'
      mt='4' ml='4'
      spacing={1}
    >
      {navItems.map((item, index) => (
        <NavItem key={item.name} {...item} />
      ))}
    </HStack>
  )
}

const NavItem = ({ icon, name, href, ...props }) => {
  const router = useRouter()
  const { pathname } = router
  
  // todo: might want to use this to highlight the active nav item in some way 🤔
  const isActive = pathname === href

  return (
    <Box
      w='full' p='1' {...props}
    >
      <Link href={href} passHref>
        <Button
          size='sm' as='a' leftIcon={icon} w='full' justifyContent='start' bg='none'
        >
          <Text>
            {name}
          </Text>
        </Button>
      </Link>
    </Box>
  )
}

export default SettingsLayout