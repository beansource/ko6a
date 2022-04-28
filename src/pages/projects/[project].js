import { useContext } from 'react'
import { useRouter } from 'next/router'
import { Repo } from '@projects/Repo'
import { Stack, StackDivider, Heading, Box, Container, VStack, HStack,
  Divider, Button, useDisclosure, Text } from '@chakra-ui/react'
import useSWR from 'swr'
import { TeamContext } from '@contexts/TeamContext'
import Image from 'next/image'
import NewRepo from '@components/projects/NewRepo'
import { FiPlus } from 'react-icons/fi'

export default function Project({ ...props }) {
  const router = useRouter()
  const { project: projectName } = router?.query
  const { currentTeam } = useContext(TeamContext)
  const { data: project, error } = useSWR(projectName && `/api/teams/${currentTeam}/projects/${projectName}`)
  const { isOpen: newRepoModalIsOpen, onOpen: onNewRepoModalOpen, onClose: onNewRepoModalClose } = useDisclosure()

  if (error) return 'scawy :('
  if (!project) return null

  if (project?.repos?.length == 0) {
    return (
      <Box>
        <Container py={{ base: '4', md: '8' }}>
          <VStack>
            <Image src="/atomic-list-is-empty-1.png" alt="empty" width="500" height="500" />
            <Text fontSize='xl'>No repos yet</Text>
          </VStack>
          <HStack my="24">
            <Divider textColor="gray.700" />
            <Button flexShrink={0} leftIcon={<FiPlus fontSize="1.25rem" />} onClick={onNewRepoModalOpen}>
              Add Repo
            </Button>
            <Divider />
          </HStack>
        </Container>
        <NewRepo isOpen={newRepoModalIsOpen} onOpen={onNewRepoModalOpen} onClose={onNewRepoModalClose} />
      </Box>
    )
  }

  return (
    <Box p="8">
      <Heading pb="2">repos</Heading>
      <Stack spacing="8" py="5" divider={<StackDivider />}>
        {project?.repos?.map(repo => {
          return (
            <Repo
              owner={repo.owner}
              name={repo.repo}
              href={repo.repo}
              description={repo.description}
            />
          )
        })}
      </Stack>
    </Box>
  )
}
