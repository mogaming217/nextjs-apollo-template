import { GraphQLSchema } from 'graphql'
import { authorizationDirectiveTransformer } from './authorization'

export const setupDirectives = (schema: GraphQLSchema) => {
  const s = authorizationDirectiveTransformer(schema)
  // directiveが追加されたらsを順番に渡していって更新していく
  return s
}
