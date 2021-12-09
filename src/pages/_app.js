import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'
import { data } from '../_data'
import Head from 'next/head'
import theme from '../theme'
import Layout from '../components/Layout'
import { SWRConfig } from 'swr'
import { $fetch } from 'ohmyfetch'
import { QueryClient, QueryClientProvider } from 'react-query'

function Ko6a({ Component, pageProps: { session, ...pageProps }}) {
  const queryClient = new QueryClient()

  return (
    <SessionProvider session={session}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{ useSystemColorMode: false }}
        >
          <SWRConfig value={{ fetcher: $fetch }}>
            <QueryClientProvider client={queryClient}>
              <Head>
                <title>
                  {data.title}
                </title>
              </Head>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </QueryClientProvider>
          </SWRConfig>
        </ColorModeProvider>
      </ChakraProvider>
    </SessionProvider>
  )
}

export default Ko6a
