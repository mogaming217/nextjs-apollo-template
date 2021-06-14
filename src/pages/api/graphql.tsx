import { initializeApolloServer } from 'graphqlServer'

export const config = {
  api: {
    bodyParser: false,
  },
}

const server = initializeApolloServer()
export default server.createHandler({ path: '/api/graphql' })
