import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'
import { data } from '../_data'
import Head from 'next/head'
import theme from '../theme'
import Layout from '../components/Layout'
import { SWRConfig } from 'swr'
import { $fetch } from 'ohmyfetch'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{ useSystemColorMode: false }}
        >
          <SWRConfig value={{ fetcher: $fetch }}>
            <Head>
              <title>
                {data.title}
              </title>
            </Head>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SWRConfig>
        </ColorModeProvider>
      </ChakraProvider>
    </SessionProvider>
  )
}

export default MyApp
