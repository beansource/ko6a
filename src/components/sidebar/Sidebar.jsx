import { useContext } from 'react'

import { Avatar, Box, Stack, Flex, Spacer, VStack } from '@chakra-ui/react'
import { BsFillFolderFill, BsSearch, BsTerminalFill } from 'react-icons/bs'
import { SettingsIcon } from '@chakra-ui/icons'
import { data } from '@data'

import { NavSectionTitle } from '@components/NavSectionTitle'
import SidebarLink from './SidebarLink'
import SidebarMenu from './SidebarMenu'

import { useTeammates, useTeams } from '@hooks'
import { TeamContext } from '@contexts/TeamContext'

import { ScrollArea } from '@components/ScrollArea'

export default function Sidebar({ user }) {
  const { currentTeam } = useContext(TeamContext)

  const { teammates, isLoading: isTeammatesLoading, isError: isTeammatesError } = useTeammates(currentTeam)
  const { teams, isLoading: isTeamsLoading, isError: isTeamsError } = useTeams(user.ghLogin)

  const error = isTeammatesError || isTeamsError

  if (error) {
    console.log("🚀 ~ file: SideBar.jsx ~ line 35 ~ Sidebar ~ {isTeammatesError, isTeamsError}", {isTeammatesError, isTeamsError})
    return 'scawy!!!'
  }

  return (
    <Box
      id="sidebar"
      as="nav"
      display="block"
      flex="1"
      width="var(--sidebar-width)"
      left="0"
      py="5"
      px="3"
      color="gray.200"
      position="fixed"
      h="100vh"
    >
      <Flex fontSize="sm" lineHeight="tall" h="100%" flexDirection="column">
        <SidebarMenu user={user} teams={teams} isTeamsLoading={isTeamsLoading} />
        <ScrollArea pt="5" pb="1" h="100%">
          <VStack h="full" align="left">
            <Box>
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
              <NavSectionTitle>{currentTeam}</NavSectionTitle>
              {teammates ? teammates.map((teammate, index) => {
                return (teammate.login != user.ghLogin ?
                  <SidebarLink
                    key={index}
                    avatar={<Avatar bg="none" size="xs" name={teammate.name} src={teammate.avatarUrl} />}
                  >
                    {teammate.name}
                </SidebarLink>
                : null)}) : null}
            </Stack>
            <Stack>
              <NavSectionTitle>Resources</NavSectionTitle>
              <SidebarLink>Documentation</SidebarLink>
              <SidebarLink href={data.github} target="_blank">
                GitHub
              </SidebarLink>
            </Stack>
            </Box>
            <Spacer />
          <SidebarLink href={'/settings'} icon={<SettingsIcon />}>
            Settings
          </SidebarLink>
          </VStack>
        </ScrollArea>
        <Spacer />
      </Flex>
    </Box>
  )
}