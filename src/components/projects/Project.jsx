import { HiCollection, HiPencilAlt, HiTrash } from 'react-icons/hi'
import { useRouter } from 'next/router'
import plur from 'plur'
import { $fetch } from 'ohmyfetch'
import { useToast } from '@chakra-ui/toast'
import { useSWRConfig } from 'swr'
import NextLink from 'next/link'
import { Box, HStack, IconButton, useColorModeValue as mode, LinkBox, LinkOverlay, 
  Link, Text } from '@chakra-ui/react'
import { useState } from 'react'

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

  const [isDeleting, setIsDeleting] = useState(false)

  const deleteProject = async () => {
    setIsDeleting(true)
    await $fetch(`/api/projects/${title}`, { method: 'DELETE' })
    toast({
      title: "Project deleted ☠️",
      description: `${title} has been successfully deleted!`,
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "top-right"
    })
    setIsDeleting(false)
    
    // todo: implement local data mutate cause supabase is being slow
    mutate('/api/projects')
  }

  return (
    <Box position="relative">
      <Box>
        <NextLink href={`${router.asPath}/${href}`} passHref>
          <Link color={mode('#0c68da', '#549bf5')} fontSize='lg'>
            {title}
          </Link>
        </NextLink>
        <Box mt={1} mb={3} maxW="xl" color={mode('gray.600', 'gray.200')}>
          <Text fontSize='sm'>
            {description}
          </Text>
        </Box>
        <HStack fontSize="sm" fontWeight="medium" color={mode('gray.500', 'white')} mt="1">
          <Box as={HiCollection} fontSize="md" color="gray.400" />
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
          aria-label="Edit" icon={<HiPencilAlt />} rounded="full" size="sm" cursor="pointer" 
        />
        <IconButton
          aria-label="Delete" icon={<HiTrash />} rounded="full" size="sm" cursor="pointer"
          onClick={deleteProject} isLoading={isDeleting}
        />
      </HStack>
    </Box>
  )
}
