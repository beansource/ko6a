import { ChakraProvider, createLocalStorageManager } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'
import theme from '../theme'
import Layout from '../components/layout'
import { SWRConfig } from 'swr'
import { $fetch } from 'ohmyfetch'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ErrorBoundary } from '@components'
const manager = createLocalStorageManager('chakra-color')

function Ko6a({ Component, pageProps: { session, ...pageProps }}) {
  const queryClient = new QueryClient()

  return (
    <SessionProvider session={session}>
      <ChakraProvider resetCSS theme={theme} colorModeManager={manager}>
        <SWRConfig value={{ fetcher: $fetch }}>
          <QueryClientProvider client={queryClient}>
            <Head>
              <title>
                Ko6a
              </title>
            </Head>
            <ErrorBoundary>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ErrorBoundary>
          </QueryClientProvider>
        </SWRConfig>
      </ChakraProvider>
    </SessionProvider>
  )
}

export default Ko6a
