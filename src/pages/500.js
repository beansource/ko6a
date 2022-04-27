import Image from 'next/image'
import { Container, VStack, Text } from '@chakra-ui/react'

export default function Custom500() {
  return (
    <Container maxW="container.lg">
      <VStack spacing="16">
        <Image src="/atomic-7.png" alt="error" width="500" height="500" />
        <Text fontSize="xl">Application borked</Text>
      </VStack>
    </Container>
  )
}