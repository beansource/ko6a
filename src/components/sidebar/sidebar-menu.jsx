import { useContext } from 'react'
import { useDisclosure } from '@chakra-ui/hooks'
import { SettingsIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import { FiPlusCircle, FiLogOut } from 'react-icons/fi'
import { UserInfo } from './user-info'
import NewTeam from '@components/teams/new-team'
import { TeamContext } from '@components/contexts/team-context'

import { signOut } from 'next-auth/react'
import { useUser } from '@util/hooks'

import {
  Menu as ChakraMenu, MenuButton, MenuList, MenuItem as ChakraMenuItem, Spinner, Image, Text, Divider, useColorMode,
  useColorModeValue
} from '@chakra-ui/react'

export default function SidebarMenu({ teams, isTeamsLoading }) {
  const { user } = useUser()
  const { currentTeam, handleTeamSwitch } = useContext(TeamContext)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const menuItemSectionTextColor = useColorModeValue('gray.600', 'gray.100')
  
  return (
    <ChakraMenu>
      <MenuButton 
        textAlign="left" p={0} w="full" display="block" transition="background 0.1s" rounded="xl"
        _hover={{ bg: 'whiteAlpha.200' }} whiteSpace="nowrap"
      >
        <UserInfo name={user.name} email={user.email} image={user.avatarUrl} />
      </MenuButton>
      <MenuList p="2" borderRadius="base" w="full" >
        {isTeamsLoading ? <Spinner /> : (
          <>
            <Text
              p="0 8px 4px 8px" color={menuItemSectionTextColor}
            >
              Personal
            </Text>
            <MenuItem
              as="button" borderRadius="base" p="8px"
              onClick={() => handleTeamSwitch(user.ghLogin)} 
            >
              <Image
                boxSize='20px'
                borderRadius='full'
                src={user.avatarUrl}
                alt={user.ghLogin}
                mr='12px'
              />
              <Text fontWeight={user.ghLogin === currentTeam ? 'bold' : 'normal'}>
                {user.ghLogin}
              </Text>
            </MenuItem>

            <Text p="0 8px 4px 8px" color={menuItemSectionTextColor}>
              Teams
            </Text>
            {teams.map(teamItem => (user.ghLogin != teamItem.name ? 
              <MenuItem
                as="button" borderRadius="base" p="8px"
                key={`${teamItem.name}-menu-item`}
                onClick={() => handleTeamSwitch(teamItem.name)}
              >
                <Image
                  boxSize='20px'
                  borderRadius='full'
                  src={teamItem.avatarUrl ?? `https://avatars.dicebear.com/api/jdenticon/${teamItem.name}.svg`}
                  alt={teamItem.name}
                  mr='12px'
                />
                <Text fontWeight={teamItem.name === currentTeam ? 'bold' : 'normal'}>
                  {teamItem.name}
                </Text>
              </MenuItem>
            : null))}
            <MenuItem
              p="8px"
              borderRadius="base"
              onClick={onOpen}
              icon={<FiPlusCircle size="20px" color="#2780ce"/>}
            >
              Create Team
            </MenuItem>
            <Divider my="2"/>

            <ColorModeToggle />
            <MenuItem
              as="a"
              p="8px"
              borderRadius="base"
              icon={<SettingsIcon boxSize="15px" />}
              href={`/settings/teams/${currentTeam}`}
            >
              Team Settings
            </MenuItem>
            <MenuItem
              p="8px"
              borderRadius="base"
              onClick={() => signOut()}
              icon={<FiLogOut size="15px" color="#4A5568" />}
            >
              Logout
            </MenuItem>
          </>
        )}
      </MenuList>
      <NewTeam isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </ChakraMenu>
  )
}

/**
 * Small wrapper for MenuItem's text color
 */
const MenuItem = ({ children, ...props }) => {
  const menuItemTextColor = useColorModeValue('gray.700', 'gray.200')
  return (
    <ChakraMenuItem color={menuItemTextColor} {...props}>
      {children}
    </ChakraMenuItem>
  )
}

const ColorModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const itemText = colorMode === 'light' ? 'Dark Mode' : 'Light Mode'
  const itemIcon = colorMode === 'light' ? <MoonIcon boxSize="15px" /> : <SunIcon boxSize="15px" />

  // Delay in place because chakra toggles the entire UI and abruptly closes the menu
  const delayedToggle = () => {
    setTimeout(() => {
      toggleColorMode()
    }, 200)
  }

  return (
    <MenuItem
      p="8px"
      borderRadius="base"
      onClick={delayedToggle}
      icon={itemIcon}
    >
      {itemText}
    </MenuItem>
  )
}
