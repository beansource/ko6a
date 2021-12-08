import { Flex, Button, Link, useColorModeValue as mode } from '@chakra-ui/react'

import Sidebar from './Sidebar'
import PageSpinner from '@components/PageSpinner'

import { useUser } from '@hooks'

import { useSession, signIn } from 'next-auth/react'

export default function Layout({ children }) {
  const { data: session } = useSession()

  const { user, isLoading, isError } = useUser(session?.user?.login)

  if (!session) {
    return (
      <Flex direction="row" width="100vw" height="100vh" align="center" justify="center" 
        bg={mode('blue.800', 'gray.800')}>
        <Link href={process.env.NEXT_PUBLIC_GITHUB_AUTH_URL}>
          <Button onClick={() => signIn()}>Login</Button>
        </Link>
      </Flex>
    )
  }
  
  if (isLoading) {
    return (
      <PageSpinner w="100vw" h="100vh"/>
    )
  }

  if (isError) {
    console.log("🚀 ~ file: Layout.jsx ~ line 48 ~ Layout ~ isError", isError)
    return 'scawy :('
  }

  return (
    <Sidebar user={user}>
      {children}
    </Sidebar>
  )
}
