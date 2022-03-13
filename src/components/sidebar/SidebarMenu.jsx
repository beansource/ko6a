import { useContext } from 'react'
import { useDisclosure } from '@chakra-ui/hooks'

import { Menu as ChakraMenu, MenuButton, MenuList, MenuItem, 
  Spinner, Image, Text, Divider, Button } from '@chakra-ui/react'
import { SettingsIcon } from '@chakra-ui/icons'
import { FiPlusCircle, FiLogOut } from 'react-icons/fi'
import { UserInfo } from './UserInfo'
import NewTeam from '@teams/NewTeam'

import { TeamContext } from '@contexts/TeamContext'

export default function SidebarMenu({ user, teams, isTeamsLoading }) {
  const { currentTeam, handleTeamSwitch } = useContext(TeamContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  
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
            <Text p="0 8px 4px 8px" color="gray.600">Personal</Text>
            <MenuItem
              as="button" onClick={() => handleTeamSwitch(user.ghLogin)} color="gray.700" borderRadius="base" p="8px"
            >
              <Image
                boxSize='20px'
                borderRadius='full'
                src={user.avatarUrl}
                alt={user.ghLogin}
                mr='12px'
              />
              <Text fontWeight={user.ghLogin === currentTeam ? 'bold' : 'normal'}>{user.ghLogin}</Text>
            </MenuItem>
            <Text p="0 8px 4px 8px" color="gray.600">Teams</Text>
            {teams.map(teamItem => (user.ghLogin != teamItem.name ? 
              <MenuItem as="button" color="gray.700" borderRadius="base" p="8px" key={`${teamItem.name}-menu-item`} 
                onClick={() => handleTeamSwitch(teamItem.name)}>
                <Image
                  boxSize='20px'
                  borderRadius='full'
                  src={teamItem.avatarUrl ?? `https://avatars.dicebear.com/api/jdenticon/${teamItem.name}.svg`}
                  alt={teamItem.name}
                  mr='12px'
                />
                <Text fontWeight={teamItem.name === currentTeam ? 'bold' : 'normal'}>{teamItem.name}</Text>
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
            <Divider my="2"/>
            <MenuItem
              as="a"
              p="8px" 
              color="gray.700" 
              borderRadius="base" 
              icon={<SettingsIcon boxSize="15px" color="gray.600" />}
              href={`/team/${currentTeam}`}
            >
              Team Settings
            </MenuItem>
            <MenuItem
              p="8px" 
              color="gray.700" 
              borderRadius="base" 
              onClick={() => console.log('logging out')} 
              icon={<FiLogOut size="15px" color="#4A5568" />}
            >
              Logout
            </MenuItem>
          </>
        )}
      </MenuList>
      <NewTeam isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>
    </ChakraMenu>
  )
}
