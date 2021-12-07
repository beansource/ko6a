import { useRouter } from 'next/router'

import { Avatar, Box, Flex, Stack, useColorModeValue as mode, Spacer, HStack, 
  Menu as ChakraMenu, MenuButton, MenuList, MenuItem, Spinner, Image, Text } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/hooks'
import { BsFillFolderFill, BsSearch, BsTerminalFill } from 'react-icons/bs'

import { FiPlusCircle } from 'react-icons/fi'

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
import NewTeam from '@teams/NewTeam'

import { useTeammates, useTeam, useTeams } from '@hooks'

export default function Sidebar({ user, children }) {
  const router = useRouter()
  const { isOpen, toggle } = useMobileMenuState()

  const { teammates, isLoading: isTeammatesLoading, isError: isTeammatesError } = useTeammates(user.defaultTeam)
  const { team, isLoading: isTeamLoading, isError: isTeamError } = useTeam(user.defaultTeam)
  const { teams, isLoading: isTeamsLoading, isError: isTeamsError } = useTeams(user.ghLogin)

  const { isOpen: isNewTeamOpen, onOpen, onClose } = useDisclosure()

  if (isTeammatesError || isTeamError || isTeamsError) {
    console.log("🚀 ~ file: SideBar.jsx ~ line 35 ~ Sidebar ~ {isTeammatesError, isTeamError, isTeamsError}", {isTeammatesError, isTeamError, isTeamsError})
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
        <ChakraMenu>
          <MenuButton textAlign="left"
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
          </MenuButton>
          <MenuList p="2" borderRadius="base">
            {isTeamsLoading ? <Spinner /> : (
              <>
                <Text p="0 8px 4px 8px" color="gray.600">Personal</Text>
                <MenuItem as="a" href={`/team/${user.ghLogin}`} color="gray.700" borderRadius="base" p="8px">
                    <Image
                      boxSize='20px'
                      borderRadius='full'
                      src={user.avatarUrl}
                      alt={user.ghLogin}
                      mr='12px'
                    />
                    <Text fontWeight={user.ghLogin === user.defaultTeam ? 'bold' : 'normal'}>{user.ghLogin}</Text>
                  </MenuItem>
                <Text p="0 8px 4px 8px" color="gray.600">Teams</Text>
                {teams.map(teamItem => (user.ghLogin != teamItem.name ? 
                  <MenuItem as="a" href={`/team/${teamItem.name}`} color="gray.700" borderRadius="base" p="8px">
                    <Image
                      boxSize='20px'
                      borderRadius='full'
                      src={teamItem.avatarUrl ?? `https://avatars.dicebear.com/api/jdenticon/${teamItem.name}.svg`}
                      alt={teamItem.name}
                      mr='12px'
                    />
                    <Text fontWeight={teamItem.name === user.defaultTeam ? 'bold' : 'normal'}>{teamItem.name}</Text>
                  </MenuItem>
                : null))}
                <MenuItem
                  p="8px" 
                  color="gray.700" 
                  borderRadius="base" 
                  onClick={onOpen} 
                  icon={<FiPlusCircle size="20px" color="#2780ce"/>}
                >
                  Create Team
                </MenuItem>
              </>
            )}
          </MenuList>
          <NewTeam isOpen={isNewTeamOpen} onOpen={onOpen} onClose={onClose}/>
        </ChakraMenu>
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
            <NavSectionTitle>{user.defaultTeam}</NavSectionTitle>
            {teammates ? teammates.map((teammate, index) => {
              return ( teammate.login != user.ghLogin ?
              <SidebarLink
                key={index}
                avatar={<Avatar size="xs" name={teammate.name} src={teammate.avatarUrl} />}
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