import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { publicEnv } from 'env'

const httpLink = createHttpLink({
  uri: publicEnv.host + '/api/graphql',
})

const authLink = setContext(async (_, { headers }) => {
  let idToken: string | null
  try {
    // TODO: get and set id token
    idToken = 'sample'
  } catch {
    idToken = null
  }

  if (publicEnv.env !== 'prod') console.log(`idToken: ${idToken}`)

  return {
    headers: {
      ...headers,
      authorization: idToken ? `Bearer ${idToken}` : '',
    },
  }
})

const _client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({}),
})

export const apolloClient = _client
