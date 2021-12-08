import { Box, HStack, IconButton, useColorModeValue as mode, LinkBox, LinkOverlay } from '@chakra-ui/react'
import { HiCollection, HiPencilAlt, HiTrash } from 'react-icons/hi'
import { useRouter } from 'next/router'
import plur from 'plur'
import { $fetch } from 'ohmyfetch'
import { useToast } from '@chakra-ui/toast'
import { useSWRConfig } from 'swr'

/**
 * Deisgn used to list a user's Projects
 * 
 * !todo: change 'title' to 'name'
 * !todo: add confirm dialog for deleting a project
 */
export const Project = props => {
  const router = useRouter()
  const toast = useToast()
  const { mutate } = useSWRConfig()
  const { title, children, repos, href, description } = props

  const deleteProject = async () => {
    await $fetch(`/api/projects/${title}`, { method: 'DELETE' })
    mutate('/api/projects')
    toast({
      title: "Project deleted ☠️",
      description: `${title} has been successfully deleted!`,
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "top-right"
    })
  }

  return (
    <LinkBox position="relative" transition="0.3s"
      _hover={{
        transform: 'scale(1.01)'
      }}
    >
      <LinkOverlay href={`${router.asPath}/${href}`}>
        <Box fontWeight="bold" maxW="xl">
          {title}
        </Box>
        <HStack fontSize="sm" fontWeight="medium" color={mode('gray.500', 'white')} mt="1">
          <Box as={HiCollection} fontSize="md" color="gray.400" />
          <span>{repos} {plur('repository', repos)}</span>
        </HStack>
        <Box mt="3" maxW="xl" color={mode('gray.600', 'gray.200')}>
          {children}
        </Box>
      </LinkOverlay>
      <HStack
        position={{
          sm: 'absolute',
        }}
        top={{
          sm: '0',
        }}
        insetEnd={{
          sm: '0',
        }}
        mt={{
          base: '4',
          sm: '0',
        }}
      >
        <IconButton as="a" aria-label="Edit" icon={<HiPencilAlt />} rounded="full" size="sm" cursor="pointer" />
        <IconButton as="a" aria-label="Delete" icon={<HiTrash />} rounded="full" size="sm" cursor="pointer" onClick={deleteProject} />
      </HStack>
    </LinkBox>
  )
}
