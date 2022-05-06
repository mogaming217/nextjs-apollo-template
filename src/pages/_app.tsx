import { ApolloProvider } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import { DefaultSeo } from 'components/seo/DefaultSeo'
import { ModalProviderContainer } from 'context/modal'
import { apolloClient } from 'graphqlClient/apollo'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { FC, ReactNode } from 'react'

const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ChakraProvider>
      <ApolloProvider client={apolloClient}>
        <ModalProviderContainer>{children}</ModalProviderContainer>
      </ApolloProvider>
    </ChakraProvider>
  )
}

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Next.js Apollo Sample</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
      <DefaultSeo />

      <Providers>
        <Component {...pageProps} />
      </Providers>
    </>
  )
}

export default App
