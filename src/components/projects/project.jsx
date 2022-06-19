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

/**
 * Deisgn used to list a user's Projects
 * 
 * !todo: change 'title' to 'name'
 * !todo: add confirm dialog for deleting a project
 */
export const Project = ({ title, repos, href, description }) => {
  const router = useRouter()
  const toast = useToast()
  const { mutate } = useSWRConfig()
  const { currentTeam } = useContext(TeamContext)

  const [isDeleting, setIsDeleting] = useState(false)

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
  }

  return (
    <Box position='relative' px={4}>
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
        <HStack color={mode('gray.500', 'white')} mt='1'>
          <Box as={HiCollection} fontSize='lg' color='gray.400' />
          <span>{repos} {plur('repository', repos)}</span>
        </HStack>
      </Box>

      <HStack
        position={{ sm: 'absolute' }}
        top={{ sm: '0' }}
        insetEnd={{ sm: '0' }}
        mt={{ base: '4', sm: '0' }}
      >
        <IconButton
          aria-label='Edit' icon={<HiPencilAlt />} rounded='full' size='sm' cursor='pointer' 
          isDisabled
        />
        <IconButton
          aria-label='Delete' icon={<HiTrash />} rounded='full' size='sm' cursor='pointer'
          onClick={deleteProject} isLoading={isDeleting} colorScheme='red'
        />
      </HStack>
    </Box>
  )
}
