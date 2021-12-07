import { Box, Container, useColorModeValue } from '@chakra-ui/react'
import { $fetch } from 'ohmyfetch'

export const File = props => {
  const { owner, repo, path } = props
  const getRaw = $fetch('/api/file', {
    method: 'POST',
    body: JSON.stringify({
      owner: owner,
      repo: repo,
      path: path.join('/'),
      token: window.localStorage.getItem('ko6aToken')
    }),
    // headers: {
    //   'Content-Type': 'application/json'
    // }
  })
  console.log(getRaw)
  return (
    <Box as="main" py="8" flex="1" {...props}>
      <Container maxW="7xl">
        <Box bg="gray.600" p="6" rounded="lg" shadow="base">
          <Box
            border="3px dashed currentColor"
            color={useColorModeValue('gray.200', 'gray.600')}
            h="96"
            rounded="lg"
          />
        </Box>
      </Container>
    </Box>
  )
}