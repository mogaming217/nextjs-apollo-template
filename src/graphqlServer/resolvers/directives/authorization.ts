import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils'
import { AuthenticationError } from 'apollo-server-micro'
import { defaultFieldResolver, GraphQLSchema } from 'graphql'
import { UserRole } from 'types/generated/serverGraphql'
import { PartialCustomContext } from 'types/server/context'

const directiveName = 'authorization'

export const authorizationDirectiveTransformer = (schema: GraphQLSchema) => {
  const typeDirectiveArgumentMaps: Record<string, any> = {}

  return mapSchema(schema, {
    [MapperKind.OBJECT_TYPE]: objectType => {
      const authDirective = getDirective(schema, objectType, directiveName)?.[0]
      if (authDirective) {
        typeDirectiveArgumentMaps[objectType.name] = authDirective
      }
      return undefined
    },
    [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
      const authDirective = getDirective(schema, fieldConfig, directiveName)?.[0] ?? typeDirectiveArgumentMaps[typeName]

      if (authDirective) {
        const requiredRole: UserRole | undefined = authDirective.requires

        if (requiredRole) {
          const { resolve = defaultFieldResolver } = fieldConfig

          fieldConfig.resolve = async (source, args, context: PartialCustomContext, info) => {
            switch (requiredRole) {
              case 'member':
                if (!context.userID) {
                  throw new AuthenticationError('ログインが必要です。')
                }
                break
            }

            return resolve(source, args, context, info)
          }

          return fieldConfig
        }
      }
    },
  })
}
