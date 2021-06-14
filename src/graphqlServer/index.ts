import { ApolloServer, gql } from 'apollo-server-micro'
import { publicEnv } from 'env'
import * as fs from 'fs'
import * as path from 'path'
import { LoggingPlugin } from './plugins/logging'
import { resolvers } from './resolvers'
import { ensureContext } from './resolvers/context'
import { dataSources } from './resolvers/datasources'
import { AuthorizationDirective } from './resolvers/directives/authorization'

export const initializeApolloServer = () => {
  // nodeを実行している環境からのパス
  const typeDefs = gql(fs.readFileSync(path.resolve(process.cwd(), './graphql/schema.graphql')).toString())
  const debuggable = publicEnv.env !== 'prod'

  const server = new ApolloServer({
    debug: debuggable,
    playground: debuggable,
    introspection: debuggable,
    typeDefs,
    resolvers,
    context: ensureContext,
    dataSources,
    plugins: [new LoggingPlugin()],
    schemaDirectives: {
      authorization: AuthorizationDirective,
    },
  })

  return server
}
