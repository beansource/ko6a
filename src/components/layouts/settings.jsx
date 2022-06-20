import { Container, List, ListItem, HStack, Button, Flex, Box, Text, Spacer, Divider, StackDivider } from '@chakra-ui/react'
import { Brush, Swords, User } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const SettingsLayout = ({ children }) => {
  return (
    <Flex flexDir='column' p='8'>
      <Flex w='full' mb='5'>
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
        <NavItem
          key={`${item.name}-${index}`} {...item}
        />
      ))}
    </HStack>
  )
}

const NavItem = ({ name, href, icon, ...props }) => {
  const router = useRouter()
  const { pathname } = router
  const isActive = pathname === href || (href === '/settings/profile' && pathname === '/settings')

  const border = isActive ? {
    borderBottomWidth:'2px',
    borderBottomStyle:'solid',
    borderBottomColor:'blue.400'
  } : {}

  return (
    <Box
      w='full' p='1' {...border} {...props}
    >
      <Link href={href} passHref>
        <Button
          as='a' size='sm' w='full' justifyContent='start' bg='none'
          leftIcon={icon}
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