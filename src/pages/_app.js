import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import { data } from '../_data'
import Head from 'next/head'
import theme from '../theme'
import Layout from '../components/Layout'
import { SWRConfig } from 'swr'
import { $fetch } from 'ohmyfetch'

function Ko6a({ Component, pageProps }) {
  return (
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
  )
}

export default Ko6a
