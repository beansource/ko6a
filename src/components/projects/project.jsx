import { HiCollection, HiPencilAlt, HiTrash } from 'react-icons/hi'
import { useRouter } from 'next/router'
import plur from 'plur'
import { $fetch } from 'ohmyfetch'
import { useToast } from '@chakra-ui/toast'
import { useSWRConfig } from 'swr'
import NextLink from 'next/link'
import { Box, HStack, IconButton, useColorModeValue as mode, Link, Text } from '@chakra-ui/react'
import { useState, useContext } from 'react'
import { TeamContext } from '@components/contexts/team-context'
import { relativeTimeFromDates } from '@util/time'

/**
 * Deisgn used to list a user's Projects
 * 
 * !todo: change 'title' to 'name'
 * !todo: add confirm dialog for deleting a project
 */
export const Project = ({ title, repos, href, description, createdAt, ...props }) => {
  const router = useRouter()
  const toast = useToast()
  const { mutate } = useSWRConfig()
  const { currentTeam } = useContext(TeamContext)
  const [isDeleting, setIsDeleting] = useState(false)

  const detailTextFontColor = mode('gray.500', 'white')

  const deleteProject = async () => {
    setIsDeleting(true)
    await $fetch(`/api/teams/${currentTeam}/projects/${title}`, { method: 'DELETE' })
    toast({
      title: 'Project deleted',
      description: `${title} has been successfully deleted!`,
      status: 'error',
      duration: 9000,
      isClosable: true,
      position: 'top-right'
    })
    setIsDeleting(false)
    
    mutate(`/api/teams/${currentTeam}/projects`)
    setIsDeleting(false)
  }

  const date = new Date(createdAt)
  const relativeDate = relativeTimeFromDates(date)

  return (
    <Box position='relative' px={4} {...props}>
      <Box>
        <NextLink href={`${router.asPath}/${href}`} passHref>
          <Link color={mode('#0c68da', '#549bf5')} fontSize='xl'>
            {title}
          </Link>
        </NextLink>
        <Box mt={1} mb={3} maxW='xl' color={mode('gray.600', 'gray.200')}>
          <Text fontSize='md'>
            {description}
          </Text>
        </Box>
        <HStack mt='1' color={detailTextFontColor} spacing={6} fontSize='sm'>
          <HStack>
            <HiCollection size='16' />
            <Text>{repos} {plur('repository', repos)}</Text>
          </HStack>
          <Text>
            Created {relativeDate}
          </Text>
        </HStack>
      </Box>

      <HStack
        position={{ sm: 'absolute' }}
        top={{ sm: '0' }}
        insetEnd={{ sm: '0' }}
        mt={{ base: '4', sm: '0' }}
      >
        <IconButton
          aria-label='Edit' icon={<HiPencilAlt />} rounded='full' size='sm' cursor='pointer' colorScheme='gray'
          isDisabled
        />
        <IconButton
          aria-label='Delete' icon={<HiTrash />} rounded='full' size='sm' cursor='pointer' colorScheme='gray'
          onClick={deleteProject} isLoading={isDeleting}
        />
      </HStack>
    </Box>
  )
}
