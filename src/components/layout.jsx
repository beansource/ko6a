import { Flex, Box, useColorModeValue as mode, Spacer, HStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Sidebar from '@components/sidebar/sidebar'
import PageSpinner from '@components/page-spinner'

import { useUser } from '@hooks'
import { TeamProvider } from '@components/contexts/team-context'

import { useSession } from 'next-auth/react'

import { SearchInput } from '@components/search-input'
import Menu from '@components/menu'
import { MobileMenuButton } from '@components/mobile-menu-button'
import { NavBreadcrumb } from '@components/nav-breadcrumb'
import { useMobileMenuState } from '@components/use-mobile-menu-state'

import { Login } from './login'

export default function Layout({ children }) {
  const router = useRouter()
  const isHome = router?.pathname === '/' || router?.pathname === '/projects'
  const onResults = router?.asPath?.includes('results')
  const { data: session } = useSession()
  const { isOpen, toggle } = useMobileMenuState()

  const { user, isLoading, isError } = useUser(session?.user?.login)

  const blueBg = mode('blue.800', 'gray.800')
  const whiteBg = mode('white', 'gray.700')

  if (!session) {
    return (
      <Flex direction="row" width="100vw" height="100vh" align="center" justify="center">
         <Login />
      </Flex>
    )
  }
  
  if (isLoading) {
    return (
      <PageSpinner w="100vw" h="100vh"/>
    )
  }

  if (isError) {
    console.log("🚀 ~ file: Layout.jsx ~ line 48 ~ Layout ~ isError", isError)
  }

  return (
    <TeamProvider defaultTeam={user.defaultTeam}>
      <Flex
        height="100vh"
        bg={blueBg}
        overflow="hidden"
        sx={{
          '--sidebar-width': '16rem',
        }}
      >
        <Sidebar user={user} />
        <Box
          flex="1" p={{ base: '0', md: '6' }}
          marginStart={{ md: 'var(--sidebar-width)' }}
          position="relative" left={isOpen ? 'var(--sidebar-width)' : '0'} transition="left 0.2s"
        >
          <Box
            maxW="2560px"
            bg={whiteBg}
            height="100%"
            pb="6"
            rounded={{
              md: 'lg',
            }}
          >
            <Flex direction="column" height="full">
              {!onResults && <Flex w="full" py="4" justify="space-between" align="center" px="10">
                <Flex align="center" minH="8">
                  <MobileMenuButton onClick={toggle} isOpen={isOpen} />
                  {!isHome && 
                    <NavBreadcrumb />
                  }
                </Flex>
                <Spacer />
                <HStack spacing="2">
                  <SearchInput />
                  <Menu />
                </HStack>
              </Flex>}
              <Flex direction="column" flex="1" overflow="auto">
                {children}
              </Flex>
            </Flex>
          </Box>
        </Box>
      </Flex>
      <Sidebar user={user}>
        {children}
      </Sidebar>
    </TeamProvider>
  )
}
