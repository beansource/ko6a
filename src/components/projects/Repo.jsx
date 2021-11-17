import { Box, HStack, IconButton, useColorModeValue as mode,
  LinkBox, LinkOverlay, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FaGithubAlt } from 'react-icons/fa'
import { BsFillFileEarmarkBinaryFill } from 'react-icons/bs'

/**
 * Deisgn used to list a Project's Repos
 * @param {*} props 
 * @returns 
 */
export const Repo = props => {
  const { repo, org, children, href } = props
  const router = useRouter()

  return (
    <LinkBox position="relative" transition="ease-in-out"
      _hover={{
        transform: 'scale(1.01)',
        transition: '0.3s'
      }}
    >
      <LinkOverlay as="a" href={`${router.asPath}/${href}`}>
        <Box fontWeight="bold" maxW="xl">
          {repo}
        </Box>
        <HStack fontSize="sm" fontWeight="medium" color={mode('gray.500', 'white')} mt="1">
          <Box as={BsFillFileEarmarkBinaryFill} fontSize="md" color="gray.400" />
          <Text>
            7b
          </Text>
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
        <IconButton aria-label="Git" icon={<FaGithubAlt />} rounded="full" size="sm" 
          as="a" href={`https://github.com/${org}/${repo}`} target="_blank"
        />
      </HStack>
    </LinkBox>
  )
}  