import { Badge, HStack, IconButton, Table, Tbody, Td, Text, Th, Thead, Tr, Avatar, Tooltip } from '@chakra-ui/react'
import * as React from 'react'
import { FiTrash2 } from 'react-icons/fi'
import { format } from 'date-fns'

export const ResultsTable = props => (
  <Table {...props}>
    <Thead>
      <Tr>
        <Th>Date</Th>
        <Th>Time</Th>
        <Th>Status</Th>
        <Th>Run by</Th>
        <Th></Th>
      </Tr>
    </Thead>
    <Tbody>
      {props.results.map(result => (
        <Tr key={result.id}>
          <Td>
            <Text color="muted">{format(new Date(result.timestamp), 'MMMM dd, yyyy')}</Text>
          </Td>
          <Td>
            <Text color="muted">{format(new Date(result.timestamp), 'h:mm:ss aaa')}</Text>
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