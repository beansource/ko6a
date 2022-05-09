import { Badge, Menu, MenuButton, MenuList, MenuItem, IconButton, 
  Table, Tbody, Td, Text, Th, Thead, Tr, Avatar, Tooltip } from '@chakra-ui/react'
import * as React from 'react'
import { FiTrash2 } from 'react-icons/fi'
import { format } from 'date-fns'
import { HamburgerIcon } from '@chakra-ui/icons'
import { $fetch } from 'ohmyfetch'

export const ResultsTable = props => (
  <Table {...props}>
    <Thead>
      <Tr>
        <Th>Date</Th>
        <Th>Time</Th>
        <Th>Status</Th>
        <Th>Run by</Th>
        <Th>Actions</Th>
      </Tr>
    </Thead>
    <Tbody>
      {props.results.map(result => (
        <Tr key={result.id} cursor="pointer" _hover={{
          bg: "gray.50"
        }}>
          <Td>
            <Text color="muted">{format(new Date(result.timestamp), 'MMMM dd, yyyy')}</Text>
          </Td>
          <Td>
            <Text color="muted">{format(new Date(result.timestamp), 'h:mm:ss aaa')}</Text>
          </Td>
          <Td>
            <Tooltip label={result.data}>
              <Badge size="sm" colorScheme="green">
                completed
              </Badge>
            </Tooltip>
          </Td>
          <Td>
            <Tooltip label={result.user.name}>
              <Avatar size="xs"
                src={`https://github.com/${result.ghLogin}.png`}
              />
            </Tooltip>
          </Td>
          <Td>
            <Menu isLazy>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon />}
                variant="ghost"
                rounded="full"
              />
              <MenuList>
                <MenuItem icon={<FiTrash2 />} command='⌘D' onClick={() => {
                  const res = $fetch(`/api/tests`, {
                    method: 'DELETE',
                    body: JSON.stringify({
                      id: result.id
                    })
                  })
                }}>
                  Delete result
                </MenuItem>
                <MenuItem icon={<FiTrash2 />} command='⌘E' disabled>
                  Export result
                </MenuItem>
              </MenuList>
            </Menu>
          </Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
)