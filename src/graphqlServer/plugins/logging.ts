import { ApolloServerPlugin, GraphQLRequestContext, GraphQLRequestListener } from 'apollo-server-plugin-base'
import { Logger } from 'lib/logger'
import { CustomContext } from 'types/server/context'
import { v4 } from 'uuid'

type Context = CustomContext

export class LoggingPlugin implements ApolloServerPlugin<Context> {
  requestDidStart(context: GraphQLRequestContext<Context>): GraphQLRequestListener<Context> {
    const requestID = v4()

    Logger.info({
      requestID,
      message: 'request_start',
      operationName: context.operationName ?? context.request.operationName,
      variables: context.request.variables,
    })

    return {
      didEncounterErrors: ({ errors }) => {
        // TODO: とりあえず全件出力
        errors.forEach(error => {
          Logger.error(
            {
              requestID,
              message: 'request_end_with_error',
              context: {
                ...context.context,
              },
            },
            error
          )
        })
      },
    }
  }
}
