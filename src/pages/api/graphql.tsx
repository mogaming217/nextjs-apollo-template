import { initializeApolloServer } from 'graphqlServer'
import { NextApiRequest, NextApiResponse } from 'next'

export const config = { api: { bodyParser: false } }

const server = initializeApolloServer()
const startServer = server.start()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await startServer
  await server.createHandler({
    path: '/api/graphql',
  })(req, res)
}
