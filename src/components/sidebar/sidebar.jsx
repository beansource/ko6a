import { useContext } from 'react'
import { Box, Stack, Flex, Spacer, VStack } from '@chakra-ui/react'
import { BsFillFolderFill } from 'react-icons/bs'
import { SettingsIcon } from '@chakra-ui/icons'
import { data } from '@data'

import TeamPreview from './team-preview'
import { NavSectionTitle } from '@components/nav-section-title'
import SidebarLink from './sidebar-link'
import SidebarMenu from './sidebar-menu'
import { ScrollArea } from '@components/scroll-area'

import { useTeammates, useTeams, useUser } from '@hooks'
import { TeamContext } from '@components/contexts/team-context'

import { Book, Github, Mountain, Wrench } from 'lucide-react'

export default function Sidebar() {
  const { currentTeam } = useContext(TeamContext)
  const { user } = useUser()

  const { teammates, isLoading: isTeammatesLoading, isError: isTeammatesError } = useTeammates(currentTeam)
  const { teams, isLoading: isTeamsLoading, isError: isTeamsError } = useTeams(user.ghLogin)

  const error = isTeammatesError || isTeamsError
  const shouldRenderTeamPreview = !error && currentTeam !== user?.ghLogin

  if (error) {
    // todo: what do here 🤔
    console.error("🚀 ~ file: SideBar.jsx ~ line 35 ~ Sidebar ~ {isTeammatesError, isTeamsError}", {
      isTeammatesError, isTeamsError
    })
  }

  return (
    <Box 
      id="sidebar" as="nav" display="block" flex="1" width="var(--sidebar-width)" left="0" py="5" px="3" 
      color="gray.200" position="fixed" h="100vh"
    >
      <Flex fontSize="sm" lineHeight="tall" h="100%" flexDirection="column">
        <SidebarMenu user={user} teams={teams} isTeamsLoading={isTeamsLoading} />
        <ScrollArea pt="5" pb="1" h="100%">
          <VStack h="full" align="left">
            <Box>
            <Stack pb="6">
              <SidebarLink icon={<BsFillFolderFill />} href="/projects">
                Projects
              </SidebarLink>
            </Stack>
            {shouldRenderTeamPreview &&
              <TeamPreview teammates={teammates} currentTeam={currentTeam} />
            }
            <NavSection title="Explore">
              <Stack pb="6">
                <SidebarLink icon={<Book size={15} />}>
                  Documentation
                </SidebarLink>
                <SidebarLink href={data.github} icon={<Github size={15} />}>
                  GitHub
                </SidebarLink>
              </Stack>
            </NavSection>
            <NavSection title="Resources">
              <Stack pb="6">
                <SidebarLink href="https://k6.io/docs" icon={<Mountain size={15} />}>
                  k6 docs
                </SidebarLink>
                <SidebarLink href="https://jslib.k6.io" icon={<Wrench size={15} />}>
                  jslib
                </SidebarLink>
              </Stack>
            </NavSection>
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

const NavSection = ({ title, children }) => {
  return (
    <Stack>
      <NavSectionTitle>{title}</NavSectionTitle>
      {children}
    </Stack>
  )
}