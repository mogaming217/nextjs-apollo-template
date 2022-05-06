import { makeExecutableSchema } from '@graphql-tools/schema'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { ApolloServer, gql } from 'apollo-server-micro'
import { publicEnv } from 'env'
import * as fs from 'fs'
import * as path from 'path'
import { LoggingPlugin } from './plugins/logging'
import { resolvers } from './resolvers'
import { ensureContext } from './resolvers/context'
import { dataSources } from './resolvers/datasources'
import { setupDirectives } from './resolvers/directives'

export const initializeApolloServer = () => {
  // nodeを実行している環境からのパス
  const typeDefs = gql(fs.readFileSync(path.resolve(process.cwd(), './graphql/schema.graphql')).toString())
  const canDebug = publicEnv.env !== 'prod'

  let schema = makeExecutableSchema({ typeDefs, resolvers })
  schema = setupDirectives(schema)

  const server = new ApolloServer({
    debug: canDebug,
    introspection: canDebug,
    schema,
    context: ensureContext,
    dataSources,
    plugins: [new LoggingPlugin(), ApolloServerPluginLandingPageGraphQLPlayground()],
  })

  return server
}
