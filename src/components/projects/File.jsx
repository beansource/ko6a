import { Box, Container, useColorModeValue } from '@chakra-ui/react'

export const File = props => (
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