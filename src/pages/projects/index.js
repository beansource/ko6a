import { useContext } from 'react'
import { Project } from '@projects/Project'
import { Stack, StackDivider, Text, VStack, HStack, Container, Divider, Button, Box } from '@chakra-ui/react'
import { TeamContext } from '@contexts/TeamContext'
import useSWR from 'swr'
import { FiPlus } from 'react-icons/fi'
import Image from 'next/image'
import NewProject from '@components/projects/NewProject'
import { useDisclosure } from '@chakra-ui/react'

export default function Projects() {
  const { currentTeam } = useContext(TeamContext)
  const { data: projects } = useSWR(`/api/teams/${currentTeam}/projects`)

  const { isOpen: newProjectModalIsOpen, onOpen: onNewProjectModalOpen, onClose: onNewProjectModalClose } = useDisclosure()

  if (projects?.length === 0) {
    return (
      <Box>
        <Container py={{ base: '4', md: '8' }}>
          <VStack>
            <Image src="/atomic-list-is-empty-1.png" alt="empty" width="500" height="500" />
            <Text fontSize='xl'>No projects yet</Text>
          </VStack>
          <HStack my="24">
            <Divider textColor="gray.700" />
            <Button flexShrink={0} leftIcon={<FiPlus fontSize="1.25rem" />} onClick={onNewProjectModalOpen}>
              Create Project
            </Button>
            <Divider />
          </HStack>
        </Container>
        <NewProject isOpen={newProjectModalIsOpen} onOpen={onNewProjectModalOpen} onClose={onNewProjectModalClose} />
      </Box>
    )
  }

  return (
    <Stack spacing="6" py="5" px="8" divider={<StackDivider />}>
      {projects?.map(project => {
        return (
          <Project
            title={project.name}
            repos={project?.repos?.length ?? 0}
            href={project.name}
            key={project.name}
            description={project.description}
          />
        )
      })}
    </Stack>
  )
}
