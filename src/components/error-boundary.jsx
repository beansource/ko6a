import { Center, VStack, Text, Heading, Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import Image from 'next/image'
import { Component } from 'react'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI

    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    console.log({ error, errorInfo })
  }

  render() {
    const ko6aRepo = 'https://github.com/beansource/ko6a'

    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Center h='100vh' bg='blue.800'>
          <VStack spacing={16} mb={16}>
            <Image src="/atomic-7.png" alt="error" width="500" height="500" />
            <VStack>
              <Heading as='h1' color='white'>
                Application borked
              </Heading>
              <Text color='white'>
                Looks like something went wrong. Submit an issue on our
                <Link isExternal href={ko6aRepo} px={1} color='blue.200'>
                  Github repo <ExternalLinkIcon mx='2px' mb='1' />
                </Link>
                if the problem persists.
              </Text>
            </VStack>
          </VStack>
        </Center>
      )
    }

    // Return children components in case of no error
    return this.props.children
  }
}

export default ErrorBoundary