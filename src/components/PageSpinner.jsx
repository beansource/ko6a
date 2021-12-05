import { VStack, Spacer, Spinner } from '@chakra-ui/react'

export default function PageSpinner({ w="full", h="full" }) {
  return (
    <VStack w={w} h={h} align="center">
      <Spacer />
      <Spinner color="blue.500" size="xl" thickness="4px" emptyColor="gray.200" speed="0.65s"/>
      <Spacer />
    </VStack>
  )
}