import { QueryResolvers } from 'types/generated/serverGraphql'

export const queryResolvers: QueryResolvers = {
  user: (_, args) => ({ id: args.id }),
}
