import { AuthenticationError, SchemaDirectiveVisitor } from 'apollo-server-micro'
import { defaultFieldResolver, GraphQLField, GraphQLInterfaceType, GraphQLObjectType } from 'graphql'
import { UserRole } from 'types/generated/serverGraphql'
import { PartialCustomContext } from 'types/server/context'
import { ensureContext as _ensureContext, NextContext } from '../context'

export class AuthorizationDirective extends SchemaDirectiveVisitor {
  visitObject(objectType: GraphQLObjectType): GraphQLObjectType | void | null {
    if ((objectType as any)._authorizationFieldsWrapped) return
    ;(objectType as any)._authorizationFieldsWrapped = true

    const fields = Object.values(objectType.getFields())
    for (const field of fields) {
      this.handleField(field)
    }
  }

  visitFieldDefinition(
    field: GraphQLField<any, any>,
    _: {
      objectType: GraphQLObjectType | GraphQLInterfaceType
    }
  ): GraphQLField<any, any> | void | null {
    this.handleField(field)
  }

  async ensureContext(args: NextContext): Promise<PartialCustomContext> {
    return _ensureContext(args)
  }

  private handleField(field: GraphQLField<any, any>) {
    const { resolve = defaultFieldResolver } = field
    field.resolve = async (...args) => {
      const [, , ctx] = args
      const context = await this.ensureContext(ctx)

      const requiredRole: UserRole | undefined = this.args.requires
      if (requiredRole) {
        switch (requiredRole) {
          case 'member':
            if (!context.userID) {
              throw new AuthenticationError('ログインが必要です。')
            }
            break
        }
      }

      return resolve.apply(this, args)
    }
  }
}
