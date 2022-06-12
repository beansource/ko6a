import { ChakraProvider, createLocalStorageManager } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'
import theme from '../theme'
import { SWRConfig } from 'swr'
import { $fetch } from 'ohmyfetch'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ErrorBoundary } from '@components'

import AppLayout from '../components/layouts/app'
import SettingsLayout from '../components/layouts/settings'
import { useRouter } from 'next/router'

const manager = createLocalStorageManager('chakra-color')

function Ko6a({ Component, pageProps: { session, ...pageProps }}) {
  const queryClient = new QueryClient()
  const router = useRouter()
  
  const pathSlugs = router.pathname.split('/').filter(slug => slug)
  const userIsInSettings = pathSlugs[0] === 'settings'
  
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
              <AppLayout>
                {userIsInSettings ? (
                  <SettingsLayout>
                    <Component {...pageProps} />
                  </SettingsLayout>
                ) : (
                  <Component {...pageProps} />
                )}
              </AppLayout>
            </ErrorBoundary>
          </QueryClientProvider>
        </SWRConfig>
      </ChakraProvider>
    </SessionProvider>
  )
}

export default Ko6a
