import { ContextFunction } from 'apollo-server-core'
import { IncomingMessage, ServerResponse } from 'http'
import { PartialCustomContext } from 'types/server/context'

export type NextContext = { req: IncomingMessage; res: ServerResponse }

export const ensureContext: ContextFunction<NextContext, PartialCustomContext> = async (args): Promise<PartialCustomContext> => {
  if ((args as any)?._ensured === true) {
    // 型をつけるのが難しすぎるので仕方なくanyにキャストして対応
    return args as any
  }

  const context: PartialCustomContext = {
    _ensured: true,
  }

  const authorization = args.req.headers.authorization
  if (authorization) {
    // TODO: verify id token
    const verified = false
    if (verified) {
      context.userID = 'sub'
    }
  }

  return context
}
