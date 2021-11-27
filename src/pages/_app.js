import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import { data } from '../_data'
import Head from 'next/head'
import theme from '../theme'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{ useSystemColorMode: false }}
      >
        <Head>
          <title>
            {data.title}
          </title>
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ColorModeProvider>
    </ChakraProvider>
  )
}

export default MyApp
