import { Box, HStack, IconButton, useColorModeValue as mode,
  LinkBox, LinkOverlay } from '@chakra-ui/react'
import { HiCollection, HiPencilAlt, HiTrash } from 'react-icons/hi'
import { useRouter } from 'next/router'
import plur from 'plur'

/**
 * Deisgn used to list a user's Projects
 * @param {*} props 
 * @returns 
 */
export const Project = props => {
  const router = useRouter()
  const { title, children, repos, href } = props

  return (
    <LinkBox position="relative" as="a" transition="ease-in-out"
      _hover={{
        transform: 'scale(1.01)',
        transition: '0.3s'
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
        <IconButton as="a" aria-label="Edit" icon={<HiPencilAlt />} rounded="full" size="sm" />
        <IconButton as="a" aria-label="Delete" icon={<HiTrash />} rounded="full" size="sm" />
      </HStack>
    </LinkBox>
  )
}