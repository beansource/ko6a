import { useRouter } from 'next/router'

import { Avatar, Box, Flex, Stack, useColorModeValue as mode, Spacer, HStack } from '@chakra-ui/react'
import { BsFillFolderFill, BsSearch, BsTerminalFill } from 'react-icons/bs'

import { data } from '../_data'
import { MobileMenuButton } from './MobileMenuButton'
import { NavBreadcrumb } from './NavBreadcrumb'
import { NavSectionTitle } from './NavSectionTitle'
import { ScrollArea } from './ScrollArea'
import { SearchInput } from './SearchInput'
import { SidebarLink } from './SidebarLink'
import { UserInfo } from './UserInfo'
import { useMobileMenuState } from './useMobileMenuState'
import Menu from './Menu'

import { useTeammates, useTeam } from '@hooks'

export default function Sidebar({ user, children }) {
  const router = useRouter()
  const { isOpen, toggle } = useMobileMenuState()

  const { teammates, isLoading: isTeammatesLoading, isError: isTeammatesError } = useTeammates(user.teamName)
  const { team, isLoading: isTeamLoading, isError: isTeamError } = useTeam(user.teamName)

  if (isTeammatesError || isTeamError) {
    console.log("🚀 ~ file: SideBar.jsx ~ line 35 ~ Sidebar ~ {isTeammatesError, isTeamError}", {isTeammatesError, isTeamError})
    return 'scawy!!!'
  }
  return (
    <Flex
    height="100vh"
    bg={mode('blue.800', 'gray.800')}
    overflow="hidden"
    sx={{
      '--sidebar-width': '16rem',
    }}
  >
    <Box
      as="nav"
      display="block"
      flex="1"
      width="var(--sidebar-width)"
      left="0"
      py="5"
      px="3"
      color="gray.200"
      position="fixed"
    >
      <Box fontSize="sm" lineHeight="tall">
      <Box
          as="a"
          href={`/team/${user.teamName}`}
          textAlign="left"
          p={0}
          w="full"
          display="block"
          transition="background 0.1s"
          rounded="xl"
          _hover={{
            bg: 'whiteAlpha.200',
          }}
          whiteSpace="nowrap"
        >
          <UserInfo name={user.name} email={user.email} image={user.avatarUrl} />
      </Box>
        <ScrollArea pt="5" pb="6">
          <SidebarLink
            display={{
              base: 'block',
              lg: 'none',
            }}
            mb="2"
            icon={<BsSearch />}
          >
            Search
          </SidebarLink>
          <Stack pb="6">
            <SidebarLink icon={<BsFillFolderFill />} href="/projects">
              Projects
            </SidebarLink>
            <SidebarLink icon={<BsTerminalFill />}>Console</SidebarLink>
          </Stack>
          <Stack pb="6">
            <NavSectionTitle>Team</NavSectionTitle>
            {isTeammatesLoading ? null : teammates.map((teammate, index) => {
              return ( teammate.login != user.ghLogin ?
              <SidebarLink
                key={index}
                avatar={<Avatar size="xs" name={teammate.name} src={teammate.avatarUrl} />}
              >
                {teammate.name}
              </SidebarLink>
            : null)})}
          </Stack>
          <Stack>
            <NavSectionTitle>Resources</NavSectionTitle>
            <SidebarLink>Documentation</SidebarLink>
            <SidebarLink href={data.github} target="_blank">
              GitHub
            </SidebarLink>
          </Stack>
        </ScrollArea>
      </Box>
    </Box>
    <Box
      flex="1"
      p={{
        base: '0',
        md: '6',
      }}
      marginStart={{
        md: 'var(--sidebar-width)',
      }}
      position="relative"
      left={isOpen ? 'var(--sidebar-width)' : '0'}
      transition="left 0.2s"
    >
      <Box
        maxW="2560px"
        bg={mode('white', 'gray.700')}
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
          <Flex direction="column" flex="1" overflow="auto" px="10" pt="8">
            {children}
          </Flex>
        </Flex>
      </Box>
    </Box>
  </Flex>
  )
}