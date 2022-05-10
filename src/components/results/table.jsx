import { Badge, Menu, MenuButton, MenuList, MenuItem, IconButton, 
  Table, Tbody, Td, Text, Th, Thead, Tr, Avatar, Tooltip, createStandaloneToast, LinkBox } from '@chakra-ui/react'
import * as React from 'react'
import { FiTrash2 } from 'react-icons/fi'
import { AiOutlineExport } from 'react-icons/ai'
import { format } from 'date-fns'
import { HamburgerIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'

const toast = createStandaloneToast()

export default function ResultsTable(props) {
  const router = useRouter()
  return (
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
          }} onClick={() => router.push(`/results/${result.id}`)}>
            <Td>
              <Text color="muted">{format(new Date(result.timestamp), 'MMMM dd, yyyy')}</Text>
            </Td>
            <Td>
              <Text color="muted">{format(new Date(result.timestamp), 'h:mm:ss aaa')}</Text>
            </Td>
            <Td>
              <Badge size="sm" colorScheme="green">
                completed
              </Badge>
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
                  transition="all 0.2s"
                  _hover={{ bg: 'gray.100' }}
                  _expanded={{ bg: 'gray.200' }}
                  _focus={{ boxShadow: 'outline' }}
                />
                <MenuList>
                  <MenuItem fontSize="lg" icon={<FiTrash2 />} onClick={() => {
                    fetch(`/api/tests`, {
                      method: 'DELETE',
                      body: JSON.stringify({
                        id: result.id
                      })
                    }).then(async res => {
                      if (res.status == 200) {
                        toast({
                          title: 'Deleted',
                          description: 'Test result has been deleted',
                          status: 'info',
                          duration: 3000,
                          isClosable: true,
                          position: 'top-right'
                        })
                      } else {
                        toast({
                          title: 'Oops',
                          description: 'Could not delete the test result',
                          status: 'error',
                          duration: 3000,
                          isClosable: true,
                          position: 'top-right'
                        })
                      }
                    })
                  }}>
                    Delete result
                  </MenuItem>
                  <MenuItem fontSize="lg" icon={<AiOutlineExport />} isDisabled>
                    Export result summary
                  </MenuItem>
                </MenuList>
              </Menu>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}