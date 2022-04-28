import { Badge, Box, Checkbox, HStack, Icon, IconButton, Table, Tbody, Td, Text, Th, Thead, Tr,
  Avatar, Tooltip } from '@chakra-ui/react'
import * as React from 'react'
import { FiTrash2 } from 'react-icons/fi'
import { IoArrowDown } from 'react-icons/io5'
import { format } from 'date-fns'

export const ResultsTable = props => (
  <Table {...props}>
    <Thead>
      <Tr>
        <Th>
          <HStack spacing="3">
            <Checkbox />
            <HStack spacing="1">
              <Text>Time</Text>
              <Icon as={IoArrowDown} color="muted" boxSize="4" />
            </HStack>
          </HStack>
        </Th>
        <Th>Status</Th>
        <Th>Run by</Th>
        <Th></Th>
      </Tr>
    </Thead>
    <Tbody>
      {props.results.map(result => (
        <Tr key={result.id}>
          <Td>
            <HStack spacing="3">
              <Checkbox />
              <Box>
                <Text color="muted">{format(new Date(result.timestamp), 'h:m:ss aaa MM/dd/yyyy')}</Text>
              </Box>
            </HStack>
          </Td>
          <Td>
            <Badge size="sm" colorScheme="green">
              {result.status}completed
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
            <HStack spacing="1">
              <Tooltip label="Delete test result">
                <IconButton
                  icon={<FiTrash2 fontSize="1.25rem" />}
                  variant="ghost"
                  aria-label="Delete result"
                />
              </Tooltip>
            </HStack>
          </Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
)