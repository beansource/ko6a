import { Flex, Button, Link, Box, useColorModeValue as mode, Spacer, HStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Sidebar from '@components/sidebar/Sidebar'
import PageSpinner from '@components/PageSpinner'

import { useUser } from '@hooks'
import { TeamProvider } from '@contexts/TeamContext'

import { useSession, signIn } from 'next-auth/react'

import { SearchInput } from '@components/SearchInput'
import Menu from '@components/Menu'
import { MobileMenuButton } from '@components/MobileMenuButton'
import { NavBreadcrumb } from '@components/NavBreadcrumb'
import { useMobileMenuState } from '@components/useMobileMenuState'

export default function Layout({ children }) {
  const router = useRouter()
  const { data: session } = useSession()
  const { isOpen, toggle } = useMobileMenuState()

  const { user, isLoading, isError } = useUser(session?.user?.login)

  const blueBg = mode('blue.800', 'gray.800')
  const whiteBg = mode('white', 'gray.700')

  if (!session) {
    return (
      <Flex direction="row" width="100vw" height="100vh" align="center" justify="center" bg={blueBg}>
        <Link href={process.env.NEXT_PUBLIC_GITHUB_AUTH_URL}>
          <Button onClick={() => signIn()}>Login</Button>
        </Link>
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
    return 'scawy :('
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
              <Flex w="full" py="4" justify="space-between" align="center" px="10">
                <Flex align="center" minH="8">
                  <MobileMenuButton onClick={toggle} isOpen={isOpen} />
                  <NavBreadcrumb slug={router?.query?.slug} />
                </Flex>
                <Spacer />
                <HStack spacing="2">
                  <SearchInput />
                  <Menu />
                </HStack>
              </Flex>
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
