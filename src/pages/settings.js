import Image from 'next/image'
import { Container, VStack, Text } from '@chakra-ui/react'

export default function Settings() {
  return (
    <Container maxW="container.lg">
      <VStack spacing="16">
        <Image src="/atomic-sculpting-vase-in-art-studio-1.png" alt="error" width="500" height="500" />
        <Text fontSize="xl">Settings coming soon or something</Text>
      </VStack>
    </Container>
  )
}